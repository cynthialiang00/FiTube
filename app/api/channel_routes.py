from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User, Playlist

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:user_id>')
def get_channel(user_id):
        user = User.query.get(user_id)

        return {'channel_user': user.to_dict(),
                'channel_videos': [video.preview_to_dict() for video in user.video],
                'channel_playlists': [playlist.preview_to_dict() for playlist in user.playlists]}
    