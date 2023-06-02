from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User, Playlist

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:user_id>')
def get_channel(user_id):
        user = User.query.get(user_id)
        if not user:
                return {'errors': ['User not found']}
        
        this_user = User.query.get(current_user.id)

        userData = user.to_dict()

        if (user in this_user.subscriptions):
                print('SUBSCRIBED TO THIS CHANNEL')
                userData["is_subscribed_to"] = True
        
        return {'channel_user': userData,
                'channel_videos': [video.preview_to_dict() for video in user.video],
                'channel_playlists': [playlist.preview_to_dict() for playlist in user.playlists]}
    