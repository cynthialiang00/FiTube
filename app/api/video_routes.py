from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Video, User, VideoReaction, Comment
from app.s3_helpers import (
    upload_video_to_s3, upload_thumb_to_s3, remove_from_s3, get_unique_filename, allowed_video_file, allowed_thumbnail_file)

import random
video_routes = Blueprint('videos', __name__)

@video_routes.route('/search/<string:query_str>')
def search(query_str):

    results = Video.query.filter(Video.title.startswith(query_str)).limit(10).all()
    return {'search_results': [video.search_to_dict() for video in results]}

@video_routes.route('/')
def get_all_videos():
    # returns all videos with only preview information
    videos = Video.query.all()
    return {'all_videos': [video.preview_to_dict() for video in videos]}

@video_routes.route('/user')
@login_required
def get_all_user_videos():
    # returns all videos owned by the user
    videos = Video.query.filter(Video.user_id==current_user.id).all()
    if not videos:
        return {'user_videos': []}, 200
    return{'user_videos': [video.user_to_dict() for video in videos]}, 200

@video_routes.route('/<int:id>')
def get_video(id):
    # returns detailed information about a video
    video = Video.query.get(id)
    

    if not video:
        return {'errors': ['Resource not found']}, 404

    video.views += 1

    db.session.commit()
    # includes other video recommendations on sidebar (all videos except for current)
    allVideos = Video.query.filter(Video.id != id)
    videos = random.sample(list(allVideos), 11)
    video_data = video.to_dict()
    
    if current_user.is_authenticated:
        this_user = User.query.get(current_user.id)
        video_user = User.query.get(video.user_id)
        if (video_user in this_user.subscriptions):
                    video_data["User"]["is_subscribed_to"] = True

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

    if not allowed_video_file(video.filename):
        print("video: file type not permitted")
        return {"errors": ["video: file type must be mp4"]}, 400
    
    if not allowed_thumbnail_file(thumbnail.filename):
        print("thumbnail: file type not permitted")
        return {"errors": ["thumbnail: file type must be pdf, png, jpg, jpeg, or gif"]}, 400
    
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
    return new_video.preview_to_dict(), 201

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
def put_video(id):
    
    edit_video = Video.query.get(id)

    if not edit_video:
        return {'errors': ['Resource not found']}, 404
    if current_user.id != edit_video.user_id:
        return {'errors': ['Unauthorized']}, 403

    if "thumbnail" in request.files:
        print("EDIT:THUMBNAIL")
        thumbnail = request.files["thumbnail"]
        if not allowed_thumbnail_file(thumbnail.filename):
            return {"errors": ["thumbnail: file type must be pdf, png, jpg, jpeg, or gif"]}, 400
        
        thumbnail.filename = get_unique_filename(thumbnail.filename)
        upload_thumbnail = upload_thumb_to_s3(thumbnail)

        if "url" not in upload_thumbnail:
            return {'errors': ['Failed to upload to AWS']}, 400
        
        remove_existing_thumb = remove_from_s3(edit_video.thumbnail)
        if not remove_existing_thumb:
            return {'errors': ['Failed to delete thumbnail from AWS']}, 400
        
        thumbnail = upload_thumbnail["url"]

        edit_video.thumbnail=thumbnail

    if request.form.get('title'):
        print("EDIT: TITLE")
        edit_video.title=request.form.get('title')
    
    if request.form.get('description'):
        print("EDIT: DESCRIPTION")
        edit_video.description=request.form.get('description')

    db.session.commit()

    return {'edit_all_videos': edit_video.preview_to_dict(), 'edit_user_videos': edit_video.user_to_dict()}, 200

@video_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_video(id):
    # deletes a single video by id
    video = Video.query.get(id)
    if not video:
        return {'errors': ['Resource not found']}, 404
    if current_user.id != video.user_id:
        return {'errors': ['Unauthorized']}, 403
    
    remove_video = remove_from_s3(video.url)
    remove_thumbnail = remove_from_s3(video.thumbnail)

    if not remove_video or not remove_thumbnail:
        return {'errors': ['Failed to delete files from AWS']}, 400
    
    db.session.delete(video)
    db.session.commit()
    return {'message': 'successfully deleted'}, 200

# @video_routes.route('/delete-test')
# def delete_test():
#     # AWS needs the image file name, not the URL, 
#     # so we split that out of the URL
#     # print(type(image_url))
#     remove_from_s3("https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/5327b391b98141e7b8f6c3b986e4aba4.jpeg")
#     return {"testing": "delete aws"}

# COMMENTS RELATED ROUTES
@video_routes.route('/<int:id>/comments')
def get_comment_videos(id):
    # gets all comments for a video by id
    video = Video.query.get(id)
    comments = video.comments
    return{'video_comments': [comment.to_dict() for comment in comments]}

@video_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def create_comment_for_video(id):
    # creates a comment for a video
    video = Video.query.get(id)
    if not video:
        return {'errors': ['Resource not found']}, 404
    
    user = User.query.get(current_user.id)
    if not user:
        return {'errors': ['Must be registered for the site']}, 404
    
    req = request.get_json()

    new_comment = Comment(content=req["content"], user=user, video=video)
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict(), 201