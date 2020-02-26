from . import db


class Book(db.Document):
    name = db.StringField()
    genre = db.StringField()
    authorId = db.StringField()
    meta = {'strict': False, 'collection': 'books'}
