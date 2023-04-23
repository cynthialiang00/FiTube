from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User
from app.s3_helpers import (
    upload_video_to_s3, upload_thumb_to_s3, remove_video_from_s3, get_unique_filename, allowed_file)

video_routes = Blueprint('videos', __name__)


@video_routes.route('/')
def get_all_videos():
    # returns all videos with only preview information
    videos = Video.query.all()
    video_data = []
    
    for video in videos:
        data = video.preview_to_dict()
        data['User']={
            'username': video.user.username,
            'avatar': video.user.avatar
        }
        video_data.append(data)

    return {'all_videos': video_data}

@video_routes.route('/user')
@login_required
def get_all_user_videos():
    # returns all videos owned by the user
    videos = Video.query.filter(Video.user_id==current_user.id).all()
    if not videos:
        return {'errors': ['User has no videos']}, 404
    
    user_videos_data = []
    for video in videos:
        data = video.user_to_dict()
        data['comments_num'] = len(video.comments)
        user_videos_data.append(data)

    return{'user_videos': user_videos_data}, 200

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

@video_routes.route('/', methods=['POST'])
@login_required
def upload_video():
    print(request)
    print(request.files)
    if "video" not in request.files:
        print("video file required")
        return {"errors": ["video file required"]}, 400
    
    if "thumbnail" not in request.files:
        print("thumbnail is required")
        return {"errors": ["thumbnail is required"]}, 400
    
    video = request.files["video"]
    thumbnail = request.files["thumbnail"]

    if not allowed_file(video.filename):
        print("video: file type not permitted")
        return {"errors": ["video: file type not permitted"]}, 400
    
    if not allowed_file(thumbnail.filename):
        print("thumbnail: file type not permitted")
        return {"errors": ["thumbnail: file type not permitted"]}, 400
    
    video.filename = get_unique_filename(video.filename)
    thumbnail.filename = get_unique_filename(thumbnail.filename)
    upload_video = upload_video_to_s3(video)
    upload_thumbnail = upload_thumb_to_s3(thumbnail)

    print('UPLOAD_VIDEO')
    print(upload_video)

    print('UPLOAD THUMBNAIL')
    print(upload_thumbnail)

    if "url" not in upload_video or "url" not in upload_thumbnail:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
            print('Failed to upload to AWS')
            return {'errors': ['Failed to upload to AWS']}, 400
    
    url = upload_video["url"]
    thumbnail = upload_thumbnail["url"]

    this_user = User.query.get(current_user.id)

    # print(request.form.get('title'))
    # print(request.form.get('description'))
    new_video = Video(url=url, thumbnail=thumbnail, title=request.form.get('title'), description=request.form.get('description'), user=this_user)
    db.session.add(new_video)
    db.session.commit()
    new_data = new_video.preview_to_dict()
    new_data['User']={
            'username': new_video.user.username,
            'avatar': new_video.user.avatar
            }
    return new_data, 201

    # if form.validate_on_submit():
          
    #     video = form.data["video"]
    #     video.filename = get_unique_filename(video.filename)
    #     upload = upload_file_to_s3(video)

    #     if "url" not in upload:
    #     # if the dictionary doesn't have a url key
    #     # it means that there was an error when we tried to upload
    #     # so we send back that error message
    #         return {'errors': ['Failed to upload to AWS']}, 400

    #     url = upload["url"]
    #     new_video = Video(url= url)
    #     db.session.add(new_video)
    #     db.session.commit()
    #     return {'message': 'successfully uploaded video'}, 201


@video_routes.route('/<int:id>', methods=['PUT'])
@login_required
def put_video():
    
    edit_video = Video.query.get(id)

    if not edit_video:
        return {'errors': ['Resource not found']}, 404
    if current_user.id != edit_video.user_id:
        return {'errors': ['Unauthorized']}, 403

    if request.files["video"]:
        print("EDIT: VIDEO")
        video = request.files["video"]
        if not allowed_file(video.filename):
            return {"errors": ["video: file type not permitted"]}, 400
        
        video.filename = get_unique_filename(video.filename)
        upload_video = upload_video_to_s3(video)

        if "url" not in upload_video:
            return {'errors': ['Failed to upload to AWS']}, 400
        
        url = upload_video["url"]

        edit_video(url=url)




    if request.files["thumbnail"]:
        print("EDIT:THUMBNAIL")
        thumbnail = request.files["thumbnail"]
        if not allowed_file(thumbnail.filename):
            return {"errors": ["thumbnail: file type not permitted"]}, 400
        
        thumbnail.filename = get_unique_filename(thumbnail.filename)
        upload_thumbnail = upload_thumb_to_s3(thumbnail)

        if "url" not in upload_thumbnail:
            return {'errors': ['Failed to upload to AWS']}, 400
        
        thumbnail = upload_thumbnail["url"]

        edit_video(thumbnail=thumbnail)


    db.session.commit()
    
    more_videos = Video.query.filter(Video.id != id).all()

    video_data = edit_video.to_dict()
    video_data['More'] = {vdo.id: vdo.preview_to_dict() for vdo in more_videos}

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
    
    remove_video = remove_video_from_s3(video.url)
    remove_thumbnail = remove_video_from_s3(video.thumbnail)

    if not remove_video or not remove_thumbnail:
        return {'errors': ['Failed to delete files from AWS']}, 400
    
    db.session.delete(video)
    db.session.commit()
    return {'message': 'successfully deleted'}, 200

