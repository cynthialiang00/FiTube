from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User

subscribe_routes = Blueprint('subscribe', __name__)


@subscribe_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def subscribe_to_user(user_id):
    try:
        if current_user.id == user_id:
            return {'errors': ['Cannot subscribe to yourself']}, 400
        this_user = User.query.get(current_user.id)
        subscribe_to_user = User.query.get(user_id)

        if subscribe_to_user in this_user.subscriptions:
            return {'errors': ['Already subscribed to this user']}, 400
            
        else:
            this_user.subscriptions.append(subscribe_to_user)
            subscribe_to_user.num_subscribers += 1
            db.session.commit()
            return {'user': subscribe_to_user.to_dict()}
        
    except:
        return {'errors': ['Unable to subscribe']}, 400
    
@subscribe_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def unsubscribe_to_user(user_id):
    try:
        if current_user.id == user_id:
            return {'errors': ['Cannot unsubscribe from yourself']}, 400
        this_user = User.query.get(current_user.id)
        subscribe_to_user = User.query.get(user_id)

        this_user.subscriptions.remove(subscribe_to_user)
        subscribe_to_user.num_subscribers -= 1

        db.session.commit()
        return {'user': subscribe_to_user.to_dict()}
    except:
        return {'errors': ['Unable to unsubscribe']}, 400
    
