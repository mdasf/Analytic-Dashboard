
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class InsightsModel(db.Model):
    __tablename__ = 'insights'

    id = db.Column(db.Integer, primary_key=True)
    end_year = db.Column(db.Integer, nullable=True)
    intensity = db.Column(db.Integer)
    sector = db.Column(db.String(255))
    topic = db.Column(db.String(255))
    insight = db.Column(db.Text)
    url = db.Column(db.String(255))
    region = db.Column(db.String(255))
    start_year = db.Column(db.Integer, nullable=True)
    impact = db.Column(db.String(255))
    added = db.Column(db.DateTime)
    published = db.Column(db.DateTime)
    country = db.Column(db.String(255))
    relevance = db.Column(db.Integer)
    pestle = db.Column(db.String(255))
    source = db.Column(db.String(255))
    title = db.Column(db.String(255))
    likelihood = db.Column(db.Integer)