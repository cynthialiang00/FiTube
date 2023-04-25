from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Comment, CommentReaction
from datetime import datetime

comment_routes = Blueprint('videos', __name__)


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment():
    comment = Comment.query.get(id)
    if not comment:
        return {'errors': ['Resource not found']}, 404
    
    if comment.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403
    
    req = request.get_json()
    current_timestamp = datetime.utcnow()

    comment.content = req["content"]
    comment.updated_at = current_timestamp

    return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment():
    comment = Comment.query.get(id)
    if not comment:
        return {'errors': ['Resource not found']}, 404
    
    if comment.user_id != current_user.id:
        return {'errors': ['Forbidden']}, 403
    
    db.session.delete(comment)
    db.session.commit()

    return {'message': 'successfully deleted comment'}