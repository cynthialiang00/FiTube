from .db import db, environment, SCHEMA, add_prefix_for_prod

class VideoReaction(db.Model):
    __tablename__ = 'video_reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("videos.id")))
    reaction = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="vid_reactions")
    video = db.relationship("Video", back_populates="reactions")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'video_id': self.video_id,
            'reaction': self.reaction
        }
