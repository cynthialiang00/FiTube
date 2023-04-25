from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Comment, CommentReaction

comment_routes = Blueprint('videos', __name__)


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment():
    return {'edit': 'comment'}

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment():
    return {'delete': 'comment'}