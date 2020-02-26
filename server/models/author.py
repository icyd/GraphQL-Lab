from . import db


class Author(db.Document):
    name = db.StringField()
    age = db.IntField()
    meta = {'strict': False, 'collection': 'authors'}
