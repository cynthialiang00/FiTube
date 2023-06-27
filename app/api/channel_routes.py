from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User, Playlist
from app.s3_helpers import (upload_avatar_to_s3, upload_banner_to_s3, remove_from_s3, get_unique_filename, allowed_thumbnail_file)

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:user_id>')
def get_channel(user_id):
        user = User.query.get(user_id)
        if not user:
                return {'errors': ['User not found']}
        
        userData = user.to_dict()

        if current_user.is_authenticated:
                this_user = User.query.get(current_user.id)
                if (user in this_user.subscriptions):
                        userData["is_subscribed_to"] = True
        
        return {'channel_user': userData,
                'channel_videos': [video.preview_to_dict() for video in user.video],
                'channel_playlists': [playlist.preview_to_dict() for playlist in user.playlists]}
    

@channel_routes.route('/<int:user_id>', methods=['PUT'])
@login_required
def edit_channel(user_id):
        user = User.query.get(user_id)

        if not user:
                return {'errors': ['Resource not found']}, 404
        if current_user.id != user.id:
                return {'errors': ['Unauthorized']}, 403
        
        if request.form.get('description'):
                user.description = request.form.get('description')
                db.session.commit()
        
        if "avatar" in request.files:
                avatar = request.files["avatar"]
                if not allowed_thumbnail_file(avatar.filename):
                        return {"errors": ["avatar: file type must be png, jpg, or jpeg"]}, 400

                avatar.filename = get_unique_filename(avatar.filename)
                upload_avatar = upload_avatar_to_s3(avatar)

                if "url" not in upload_avatar:
                        return {'errors': ['Failed to upload to AWS']}, 400

                if user.avatar:
                        remove_existing_avatar = remove_from_s3(user.avatar)
                        if not remove_existing_avatar:
                                return {'errors': ['Failed to delete avatar from AWS']}, 400
                
                user.avatar = upload_avatar["url"]
                db.session.commit()
        
        if "banner" in request.files:
                banner = request.files["banner"]
                if not allowed_thumbnail_file(banner.filename):
                        return {"errors": ["banner: file type must be png, jpg, or jpeg"]}, 400

                banner.filename = get_unique_filename(banner.filename)
                upload_banner = upload_banner_to_s3(banner)

                if "url" not in upload_banner:
                        return {'errors': ['Failed to upload to AWS']}, 400

                if user.banner:
                        remove_existing_banner = remove_from_s3(user.banner)
                        if not remove_existing_banner:
                                return {'errors': ['Failed to delete banner from AWS']}, 400
                
                user.banner = upload_banner["url"]
                db.session.commit()

        

        return {'edit_user': user.to_dict()}