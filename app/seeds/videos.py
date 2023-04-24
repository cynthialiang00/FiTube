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

    video_4 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Lake+-+Poke%CC%81mon+Diamond+%E2%A7%B8+Pearl+%E2%A7%B8+Platinum+%5Bf6JIQjPhqfY%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/pokemon-rain.jpeg",
        title="Pokemon Lake Verity Pokémon Brilliant Diamond & Shining Pearl",
        description="""RESPECT MY USAGE TERMS AND I'LL RESPECT YOURS:
        1. You are able to use my themes as background music/streams/games, I only ask for you to put the link of the songs you used in the description of your video. (If it is a stream, make a reference to my channel, for games, credit me.)
        2. DO NOT Re-Upload/Extend/Mashup any of my songs.""",
        user=demo
    )

    video_2 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Eternal+Wind+(FFIII%E2%A7%B8XIV+Lo-Fi%E2%A7%B8Chill-Hop+cover)+-+Roy+Samuel+Clark+%5BTjILU66il_g%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/ff3-eternalwind.jpeg",
        title="Eternal Wind(FFIII) Lo-Fi Chillhop Remix",
        description="Perfect for studying, concentrating at work, calming your baby to sleep, getting Crystal Tower in raid roulette yet again, and more!",
        user=marnie
    )

    video_5 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Maple+Story+-+Raindrop+Flower+Remake+(+Lo-Fi+)+%5BMX1GORhKSbU%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/maple-piano.jpeg",
        title="Maplestory Raindrop Flower Remake (Lo-Fi)",
        description="""VGM Remaker, Maple Story - Raindrop Flower Remake (Lo-Fi) | Remix
                    At VGM Remaker, we're all about celebrating the music that has touched our hearts and inspired our gaming adventures. We hope this track brings you joy and nostalgia, and inspires you to discover even more amazing video game music.
                    All copyrights belong to the original publishers of the game. This is a non-profit project made for entertainment purposes only.
                    Thank you for listening and don't forget to like and subscribe for more!""",
        user=marnie
    )

    video_3 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/K.K.+Cruisin'+%5BwQ7JYHY4bUk%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/ac-thumb-1.jpeg",
        title="K.K. Cruisin",
        description="K.K. Cruisin' · Helynt",
        user=bobbie
    )

    video_6 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Maplestory+Lofi+-+Above+The+Treetops+%5BjvWlHa_0eRU%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/maple-mush.jpeg",
        title="Maplestory Lofi Above The Treetops",
        description="""Enjoy the best Maple Story Soundtracks as Lo-Fi Remixes.
        Study, Relax and Chill to these beautiful nostalgic background music tracks.
        From Ellinia Missing You and Above the Treetops back to Sleepywood and Moonlight Shadow - this playlist features remixes 
        of all the best classic Maple Story Music pieces. Now go out and hunt those snails Maplers!""",
        user=bobbie
    )

    db.session.add(video_1)
    db.session.add(video_2)
    db.session.add(video_3)
    db.session.add(video_4)
    db.session.add(video_5)
    db.session.add(video_6)
    db.session.commit()

    return [video_1, video_2, video_3, video_4, video_5, video_6]



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