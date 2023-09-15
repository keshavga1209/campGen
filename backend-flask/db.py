from flask import Flask
from flask_pymongo import pymongo
from dotenv import load_dotenv

CONNECTION_STRING = environ.get('MONGO_CONNECTION_STRING')
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('rakathon_db')
collection = pymongo.collection.Collection(db, 'campaigns')