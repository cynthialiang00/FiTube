from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments(users, videos):
    demo = users[0]
    marnie = users[1]
    bobbie = users[2]

    video_1 = videos[0]
    video_2 = videos[1]
    video_3 = videos[2]

    comment_1 = Comment(
        content="This game has such a great sound track! And to be honest, 10pm doesn't feel like 10pm without this song :)",
        user = marnie,
        video = video_1
    )

    comment_2 = Comment(
        content="Wow I love this so much it sounds so amazing plus I love Eternal Wind, in general, it's one of the best ost. Also whos the pretty lady?",
        user=bobbie,
        video= video_2
    )

    comment_3 = Comment(
        content="When he said 'crab pee pee', I felt that.",
        user=demo,
        video=video_3
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()