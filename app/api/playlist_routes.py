from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User, Playlist

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/<int:playlist_id>')
def get_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    if not playlist:
        return {'errors': ['Playlist not found']}, 404

    return {'playlist_title': playlist.name,
            'playlist_owner': playlist.user.username,
            'playlist_videos': [video.preview_to_dict() for video in playlist.videos]}

