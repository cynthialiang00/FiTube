from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),
                         nullable=True)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("videos.id")),
                         nullable=True)

    content = db.Column(db.Text, nullable=False)

    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="comments")
    video = db.relationship("Video", back_populates="comments")
    reactions = db.relationship("CommentReaction", back_populates="comment", cascade="all, delete, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'User': {
                'username': self.user.username,
                'avatar': self.user.avatar
            }
        }
