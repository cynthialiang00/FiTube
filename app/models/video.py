from .db import db, environment, SCHEMA, add_prefix_for_prod


class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),
                         nullable=True)


    url = db.Column(db.Text, nullable=False)
    thumbnail = db.Column(db.Text, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    views = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="video")
    comments = db.relationship("Comment", back_populates="video", cascade="all, delete, delete-orphan")
    reactions = db.relationship("VideoReaction", back_populates="video", cascade="all, delete, delete-orphan")

    playlist = db.relationship(
        "Playlist",
        secondary='playlists_videos',
        back_populates="videos")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'url': self.url,
            'thumbnail': self.thumbnail,
            'title': self.title,
            'description': self.description,
            'views': self.views,
            'created_at': self.created_at,
            'likes_num': len([reaction for reaction in self.reactions if reaction.reaction=="like"]),
            'dislikes_num': len([reaction for reaction in self.reactions if reaction.reaction=="dislike"]),
            'User': {'username': self.user.username,
                     'avatar': self.user.avatar,
                     'num_subscribers': self.user.num_subscribers
                     }
        }
    
    def search_to_dict(self):
        return {
            'title': self.title
        }
    
    def preview_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'thumbnail': self.thumbnail,
            'title': self.title,
            'views': self.views,
            'created_at': self.created_at,
            'User': {'username': self.user.username,
                     'avatar': self.user.avatar
                     }
        }

    def user_to_dict(self):
        return {
            'id': self.id,
            'thumbnail': self.thumbnail,
            'title': self.title,
            'description': self.description,
            'views': self.views,
            'created_at': self.created_at,
            'comments_num': len(self.comments),
            'likes_num': len([reaction for reaction in self.reactions if reaction.reaction=="like"]),
            'dislikes_num': len([reaction for reaction in self.reactions if reaction.reaction=="dislike"])
        }
