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

    comment_4 = Comment(
        content="""Wow, this article really opened my eyes to a different perspective on the issue. Thank you for sharing your insights!""",
        user=bobbie,
        video=videos[3]
    )

    comment_5 = Comment(
        content="""I can't believe how delicious this meal is. You're an amazing cook!""",
        user=demo,
        video=videos[4]
    )

    comment_6 = Comment(
        content="""I totally agree with you. The current state of affairs is concerning, and I hope we can work towards a solution.""",
        user=marnie,
        video=videos[5]
    )

    comment_7 = Comment(
        content="""That joke was hilarious! You always know how to make me laugh.""",
        user=marnie,
        video=videos[6]
    )

    comment_8 = Comment(
        content="""I'm sorry to hear that you're going through a tough time. If you ever need someone to talk to, I'm here for you.""",
        user=bobbie,
        video=videos[7]
    )

    comment_9 = Comment(
        content="""Congratulations on your achievement! You worked so hard for this and deserve all the success.""",
        user=demo,
        video=videos[8]
    )

    comment_10 = Comment(
        content="""I love how passionate you are about your hobbies. It's inspiring to see someone pursue their passions with such dedication.""",
        user=bobbie,
        video=videos[9]
    )

    comment_11 = Comment(
        content="""Your artwork is absolutely stunning. I can see the amount of effort and creativity you put into each piece.""",
        user=marnie,
        video=videos[9]
    )

    comment_12 = Comment(
        content="""I appreciate your honesty and vulnerability. It takes a lot of courage to open up like that.""",
        user=bobbie,
        video=videos[10]
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.commit()
    return [comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9, comment_10, comment_11, comment_12]



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