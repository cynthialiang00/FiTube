from app.models.db import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Video


def seed_videos(users):
    demo = users[0]
    marnie = users[1]
    bobbie = users[2]

    video_1 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Animal+Crossing%EF%BC%9A+City+Folk++OST+-+10+PM+(Normal)+%5BgNPR2UHMgFA%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/ac-rainy.jpeg",
        title="Animal Crossing City Folk OST 10pm",
        description ="Peaceful nostalgic AACF OST for your study needs :D",
        user=demo
    )

    video_2 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Eternal+Wind+(FFIII%E2%A7%B8XIV+Lo-Fi%E2%A7%B8Chill-Hop+cover)+-+Roy+Samuel+Clark+%5BTjILU66il_g%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/ff3-eternalwind.jpeg",
        title="Eternal Wind(FFIII) Lo-Fi Chillhop Remix",
        description="Perfect for studying, concentrating at work, calming your baby to sleep, getting Crystal Tower in raid roulette yet again, and more!",
        user=marnie
    )

    video_3 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/K.K.+Cruisin'+%5BwQ7JYHY4bUk%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/ac-thumb-1.jpeg",
        title="K.K. Cruisin",
        description="K.K. Cruisin' · Helynt",
        user=bobbie
    )

    db.session.add(video_1)
    db.session.add(video_2)
    db.session.add(video_3)
    db.session.commit()

    return [video_1, video_2, video_3]



# Uses a raw SQL query to TRUNCATE or DELETE the videos table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))
        
    db.session.commit()