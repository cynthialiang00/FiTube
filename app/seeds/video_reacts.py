from app.models import db, VideoReaction, environment, SCHEMA
from sqlalchemy.sql import text


def seed_video_reactions(users, videos):
    demo = users[0]
    marnie = users[1]
    bobbie = users[2]

    video_1 = videos[0]
    video_2 = videos[1]
    video_3 = videos[2]


    video_reaction_1 = VideoReaction(
        user=marnie,
        video=video_1,
        reaction="like"
    )

    video_reaction_3 = VideoReaction(
        user=bobbie,
        video=video_1,
        reaction="dislike"
    )

    video_reaction_2 = VideoReaction(
        user=demo,
        video=video_2,
        reaction="like"
    )

    video_reaction_4 = VideoReaction(
        user=bobbie,
        video=video_2,
        reaction="like"
    )

    video_reaction_5 = VideoReaction(
        user=marnie,
        video=video_3,
        reaction="dislike"
    )

    video_reaction_6 = VideoReaction(
        user=demo,
        video=video_3,
        reaction="dislike"
    )

    db.session.add(video_reaction_1)
    db.session.add(video_reaction_2)
    db.session.add(video_reaction_3)
    db.session.add(video_reaction_4)
    db.session.add(video_reaction_5)
    db.session.add(video_reaction_6)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_video_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.video_reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM video_reactions"))
        
    db.session.commit()