from flask import Blueprint, json
from flask_login import login_required, current_user
from app.models import db, Video

video_routes = Blueprint('videos', __name__)


@video_routes.route('/')
def get_all_videos():
    # returns all videos with only preview information
    videos = Video.query.all()
    return {'all_videos': [video.preview_to_dict() for video in videos]}

@video_routes.route('/<int:id>')
def get_video(id):
    # returns detailed information about a video
    video = Video.query.get(id)
    if not video:
        return {'errors': ['Resource not found']}, 404
    # includes other video recommendations on sidebar (all videos except for current)
    videos = Video.query.filter(Video.id != id).all()

    video_data = video.to_dict()
    video_data['More'] = {vdo.id: vdo.preview_to_dict() for vdo in videos}
    return {'one_video': [video_data]}, 200

@video_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_video(id):
    # deletes a single video by id
    video = Video.query.get(id)
    if not video:
        return {'errors': ['Resource not found']}, 404
    if current_user.id != video.user_id:
        return {'errors': ['Unauthorized']}, 403
    
    db.session.delete(video)
    db.session.commit()
    return {'message': 'successfully deleted'}, 200

