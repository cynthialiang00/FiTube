"""subscriptions n playlists

Revision ID: fcd127955dc1
Revises: 
Create Date: 2023-05-26 19:35:05.813645

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'fcd127955dc1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('avatar', sa.String(length=255), nullable=True),
    sa.Column('banner', sa.Text(), nullable=True),
    sa.Column('num_subscribers', sa.Integer(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('is_private', sa.Boolean(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE playlists SET SCHEMA {SCHEMA};")

    op.create_table('subscriptions',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('subscribed_to_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['subscribed_to_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'subscribed_to_id'),
    sa.UniqueConstraint('user_id', 'subscribed_to_id', name='unique_subscriptions')
    )
    with op.batch_alter_table('subscriptions', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_subscriptions_user_id'), ['user_id'], unique=False)

    if environment == "production":
        op.execute(f"ALTER TABLE subscriptions SET SCHEMA {SCHEMA};")

    op.create_table('videos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('url', sa.Text(), nullable=False),
    sa.Column('thumbnail', sa.Text(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('views', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE videos SET SCHEMA {SCHEMA};")


    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('video_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['video_id'], ['videos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")

    op.create_table('playlists_videos',
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.Column('video_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['video_id'], ['videos.id'], ),
    sa.PrimaryKeyConstraint('playlist_id', 'video_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE playlists_videos SET SCHEMA {SCHEMA};")

    op.create_table('video_reactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('video_id', sa.Integer(), nullable=True),
    sa.Column('reaction', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['video_id'], ['videos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE video_reactions SET SCHEMA {SCHEMA};")

    op.create_table('comment_reactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('comment_id', sa.Integer(), nullable=True),
    sa.Column('reaction', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE comment_reactions SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comment_reactions')
    op.drop_table('video_reactions')
    op.drop_table('playlists_videos')
    op.drop_table('comments')
    op.drop_table('videos')
    with op.batch_alter_table('subscriptions', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_subscriptions_user_id'))

    op.drop_table('subscriptions')
    op.drop_table('playlists')
    op.drop_table('users')
    # ### end Alembic commands ###
