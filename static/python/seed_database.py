import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system("dropdb mylibrary")
os.system('createdb mylibrary')

with open('static/books_seed.json') as f:
    book_data = json.loads(f.read())

books_in_db = []

for book in book_data:

    google_books_id =
    isbn_10 = 
    isbn_13 =
    title = 
    overview = 
    cover =
    publish_date =