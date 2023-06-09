from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

subscription = db.Table(
    'subscriptions',
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), index=True, primary_key=True),
    db.Column("subscribed_to_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.UniqueConstraint('user_id', 'subscribed_to_id', name='unique_subscriptions')
)

if environment == "production":
    subscription.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255), nullable=True)
    banner = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    num_subscribers = db.Column(db.Integer, nullable=True)
    
    subscriptions = db.relationship('User', secondary='subscriptions',
                                    primaryjoin=id==subscription.c.user_id, 
                                    secondaryjoin=id==subscription.c.subscribed_to_id,
                                    backref="subscribers")
    

    video = db.relationship("Video", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    vid_reactions = db.relationship("VideoReaction", back_populates="user")
    cmt_reactions = db.relationship("CommentReaction", back_populates="user")
    playlists = db.relationship("Playlist", back_populates="user")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'num_subscribers': self.num_subscribers,
            'avatar': self.avatar,
            'banner': self.banner,
            'description': self.description,
            'created_at': self.created_at,
        }
