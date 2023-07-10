from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User, Playlist

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route('/')
@login_required
def get_all_playlists():
    user = User.query.get(current_user.id)

    
    playlists = user.playlists

    return {'user_playlists': [playlist.preview_to_dict() for playlist in playlists]}, 200



@playlist_routes.route('/<int:playlist_id>')
def get_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    if not playlist:
        return {'errors': ['Playlist not found']}, 404

    return {'playlist_title': playlist.name,
            'playlist_owner': playlist.user.username,
            'playlist_owner_id': playlist.user_id,
            'playlist_id': playlist.id,
            'playlist_videos': [video.preview_to_dict() for video in playlist.videos]}, 200

# @playlist_routes.route('/<int:playlist_id>', methods=['POST'])
# def create_playlist():
    
#     return {}, 200

@playlist_routes.route('/<int:playlist_id>/<int:video_id>', methods=['POST'])
@login_required
def add_playlist_video(playlist_id, video_id):
    try:
        playlist = Playlist.query.get(playlist_id)
        video_to_add = Video.query.get(video_id)
        
        if not playlist or not video_to_add:
            return {'errors': ['Not found']}, 404
        
        if video_to_add in playlist.videos:
            return {'errors': ['Video already in playlist']}, 400
        
        playlist.videos.append(video_to_add)

        db.session.commit()
        return {'playlist_add_video': video_to_add.preview_to_dict()}, 200
    except:
        return {'errors': ['Unable to add video to playlist']}, 400

@playlist_routes.route('/<int:playlist_id>/<int:video_id>', methods=['DELETE'])
@login_required
def delete_playlist_video(playlist_id, video_id):
    try:
        playlist = Playlist.query.get(playlist_id)
        video_to_delete = Video.query.get(video_id)

        if not playlist or not video_to_delete:
            return {'errors': ['Not found']}, 404
        
        if video_to_delete in playlist.videos:
            playlist.videos.remove(video_to_delete)
            db.session.commit()
            return {'message': 'Successfully deleted video from playlist'}, 200
        
        else:
            return {'errors': ['Video not in playlist']}, 400
        

        
    except:
        return {'errors': ['Unable to delete video to playlist']}, 400


    
    