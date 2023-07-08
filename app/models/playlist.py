from .db import db, environment, SCHEMA, add_prefix_for_prod


class Playlist(db.Model):
    __tablename__ = 'playlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),
                         nullable=True)
    name = db.Column(db.String(255), nullable=False)
    is_private = db.Column(db.Boolean, nullable=False, default=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="playlists")
    
    videos = db.relationship(
        "Video",
        secondary='playlists_videos',
        back_populates="playlist")
    
    def preview_to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'is_private': self.is_private,
            'description': self.description,
            'updated_at': self.updated_at,
            'video_preview': self.videos[0].preview_to_dict(),
            'length': len(self.videos)
        }


    
