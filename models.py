"""Models for Cupcake app."""

from flask_sqlalchemy import SQLAlchemy

DEFAULT_IMG = 'https://tinyurl.com/demo-cupcake' 

db = SQLAlchemy()

class Cupcake(db.Model):
    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=DEFAULT_IMG)

    def image_url(self):
        return self.image

    def serialize(self):
        return {
            'id': self.id,
            'flavor': self.flavor,
            'size': self.size,
            'rating': self.rating,
            'image': self.image
        }


def connect_db(app):
    db.app = app
    db.init_app(app)