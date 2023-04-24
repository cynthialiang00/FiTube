from .db import db, environment, SCHEMA, add_prefix_for_prod

class CommentReaction(db.Model):
    __tablename__ = 'comment_reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("comments.id")))
    reaction = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="cmt_reactions")
    comment = db.relationship("Comment", back_populates="reactions")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'reaction': self.reaction
        }
