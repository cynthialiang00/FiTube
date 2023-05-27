from .db import db, environment, SCHEMA, add_prefix_for_prod

playlist_video = db.Table(
    'playlists_videos',
    db.Model.metadata,
    db.Column("playlist_id", db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), primary_key=True),
    db.Column("video_id", db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), primary_key=True),
)

if environment == "production":
    playlist_video.schema = SCHEMA