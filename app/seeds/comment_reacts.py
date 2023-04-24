from app.models import db, CommentReaction, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comment_reactions(users, comments):
    demo = users[0]
    marnie = users[1]
    bobbie = users[2]

    comment_1 = comments[0]
    comment_2 = comments[1]
    comment_3 = comments[2]

    comment_reaction_1 = CommentReaction(
        user=demo,
        comment=comment_1,
        reaction="like"
    )

    comment_reaction_3 = CommentReaction(
        user=bobbie,
        comment=comment_1,
        reaction="dislike"
    )

    comment_reaction_2 = CommentReaction(
        user=marnie,
        comment=comment_2,
        reaction="like"
    )

    comment_reaction_4 = CommentReaction(
        user=demo,
        comment=comment_2,
        reaction="like"
    )

    comment_reaction_5 = CommentReaction(
        user=marnie,
        comment=comment_3,
        reaction="dislike"
    )

    comment_reaction_6 = CommentReaction(
        user=bobbie,
        comment=comment_3,
        reaction="dislike"
    )

    db.session.add(comment_reaction_1)
    db.session.add(comment_reaction_2)
    db.session.add(comment_reaction_3)
    db.session.add(comment_reaction_4)
    db.session.add(comment_reaction_5)
    db.session.add(comment_reaction_6)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comment_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comment_reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comment_reactions"))
        
    db.session.commit()