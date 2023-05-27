from flask.cli import AppGroup
from .users import seed_users, undo_users
from .videos import seed_videos, undo_videos
from .comments import seed_comments, undo_comments
from .comment_reacts import seed_comment_reactions, undo_comment_reactions
from .video_reacts import seed_video_reactions, undo_video_reactions
from .playlists import seed_playlists, undo_playlists
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_playlists()
        undo_comment_reactions()
        undo_video_reactions()
        undo_comments()
        undo_videos()
        undo_users()
    users = seed_users()
    videos = seed_videos(users)
    seed_video_reactions(users, videos)
    comments = seed_comments(users, videos)
    seed_comment_reactions(users, comments)
    seed_playlists(users,videos)



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_playlists()
    undo_comment_reactions()
    undo_video_reactions()
    undo_comments()
    undo_videos()
    undo_users()
    # Add other undo functions here