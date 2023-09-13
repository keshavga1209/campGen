from flask import Flask
from flask_pymongo import pymongo

CONNECTION_STRING = "mongodb+srv://keshg0912:test123@cluster0.fldo7z7.mongodb.net/?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('rakathon_db')
collection = pymongo.collection.Collection(db, 'campaigns')