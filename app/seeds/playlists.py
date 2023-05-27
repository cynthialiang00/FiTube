from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_playlists(users, videos):
    demo = users[0]
    marnie = users[1]

    demo_playlist1 = Playlist(user=demo,
                              name="Demo's Best",
                              description="My prouder uploads")
    demo_playlist2 = Playlist(user=demo,
                              name="Coding playlist",
                              is_private=True)    
    marnie_playlist1= Playlist(user=marnie,
                               name="video game music")
    
    demo_playlist1.videos.append(videos[0])
    demo_playlist1.videos.append(videos[6])
    demo_playlist1.videos.append(videos[9])

    demo_playlist2.videos.append(videos[6])
    demo_playlist2.videos.append(videos[1])
    demo_playlist2.videos.append(videos[2])
    demo_playlist2.videos.append(videos[5])
    demo_playlist2.videos.append(videos[8])
    demo_playlist2.videos.append(videos[10])

    marnie_playlist1.videos.append(videos[7])



    db.session.add(demo_playlist1)
    db.session.add(demo_playlist2)
    db.session.add(marnie_playlist1)

    db.session.commit()
    return


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()