from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User, Playlist

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
                user.description=request.form.get('description')

        return