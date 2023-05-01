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

    video_7 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/BnS+2.0+-+Music+%5B+Peasant+village+%5D+%5BRbQK7DVHiaY%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/bns.jpeg",
        title="Blade and Soul: Peasant Village",
        description="""It was a warm summer evening and the sun had just begun to set over the horizon.
        The sky was a vibrant orange and pink color, creating a stunning backdrop for the silhouettes of
        the trees in the distance. A gentle breeze blew through the air, carrying with it the sweet scent of blooming flowers. 
        As I sat on my porch, sipping on a cold glass of lemonade, I couldn't help but feel grateful for moments like this. 
        It was a reminder to slow down and appreciate the simple pleasures in life.""",
        user=demo
    )

    video_8 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Continue+%5BNQVdo_sKyFo%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/super-mario.jpeg",
        title="Mario: Continue LoFi Chillhop",
        description="""The city was bustling with energy as people rushed about their daily routines. 
        Cars honked and buses roared as they made their way through the busy streets. 
        The skyscrapers towered above, their shiny exteriors reflecting the bright sunlight. 
        The sound of chatter and laughter filled the air as people hurried from one place to another. 
        It was a stark contrast to the quietness of the countryside, but there was a certain charm to the chaos.""",
        user=marnie
    )

    video_9 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Final+Fantasy+VII+~+Aerith+Theme+(Flowers+Blooming+in+the+Church)+Lofi+Hip+Hop+Remix+%5B6h-b_Pbp1Nc%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/tavern.jpeg",
        title="Final Fantasy VII Aerith Theme (Flowers Blooming in the Church) Lofi Hip Hop Remix",
        description="""The waves crashed against the shore, creating a soothing melody that filled the air. 
        The sun was high in the sky, casting a warm glow over the sandy beach. Seagulls soared overhead, 
        their cries echoing in the distance. As I walked along the shoreline, I couldn't help but feel a 
        sense of peace wash over me. The ocean had a way of making all of life's problems seem small and insignificant.""",
        user=bobbie
    )

    video_10 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Lonely+Rolling+Star+%5BZ8i-St-LIow%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/morning-train.jpeg",
        title="Lonely Rolling Star",
        description="""The forest was dense and dark, with towering trees that seemed to stretch up to the sky. 
        The air was thick with the scent of pine and damp earth. It was quiet, except for the occasional rustling 
        of leaves and twigs underfoot. As I hiked deeper into the woods, I felt a sense of both awe and unease. 
        It was a reminder of how vast and powerful nature can be.""",
        user=demo
    )

    video_11 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/Worlds+Most+Wondrous+Music+-+Satorl%2C+The+Shimmering+Marsh+%5BmfvttYvy2gA%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/bookstore.jpeg",
        title="Satorl The Shimmering Marsh, night",
        description="""The concert was in full swing, with the band playing their hearts out on stage. 
        The crowd was packed tight, swaying and dancing to the beat. The music was loud, filling the air 
        with an electrifying energy. I closed my eyes and let the rhythm wash over me, losing myself in the moment. 
        It was a feeling of pure joy and liberation.""",
        user=marnie
    )

    video_12 = Video(
        url="https://liang-capstone-bucket.s3.amazonaws.com/videos/%EF%BC%A6%EF%BD%81%EF%BD%92%EF%BD%8F%EF%BD%8E%E3%80%80%EF%BC%B7%EF%BD%8F%EF%BD%8F%EF%BD%84%EF%BD%93+%5BVaQZuFTQE78%5D.mp4",
        thumbnail="https://liang-capstone-bucket.s3.amazonaws.com/thumbnails/nintendo-purphouse.jpeg",
        title="Faron Woods Lofi Ver",
        description="""The cafe was cozy and quaint, with a warm and inviting atmosphere. The smell of 
        fresh coffee and baked goods wafted through the air. The chatter of customers filled the space, 
        creating a lively hum. I sipped on my latte and nibbled on a croissant, enjoying the simple pleasures of life. 
        It was a moment of calm amidst the chaos of the world.""",
        user=bobbie
    )

    db.session.add(video_1)
    db.session.add(video_2)
    db.session.add(video_3)
    db.session.add(video_4)
    db.session.add(video_5)
    db.session.add(video_6)
    db.session.add(video_7)
    db.session.add(video_8)
    db.session.add(video_9)
    db.session.add(video_10)
    db.session.add(video_11)
    db.session.add(video_12)
    db.session.commit()

    return [video_1, video_2, video_3, video_4, video_5, video_6, video_7, video_8, video_9, video_10, video_11, video_12]



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