import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
# import server

from server import app
model.connect_to_db(app)

os.system("dropdb mylibrary")
os.system('createdb mylibrary')
model.db.create_all()

with open('../json/books_seed.json') as f:
    book_data = json.loads(f.read())['items']

books_in_db = []

for book in book_data:

    """BOOKS"""

    google_books_id = book['id']

    isbn_list = book['volumeInfo']['industryIdentifiers']

    for info in isbn_list:
        if info['type'] == 'ISBN_13':
            isbn_13 = info['identifier']
        else:
            isbn_13 = None

        if info['type'] == 'ISBN_10':
            isbn_10 = info['identifier']
        else: 
            isbn_10 = None

    title = book['volumeInfo']['title']
    
    if 'description' in book['volumeInfo']:
        overview = book['volumeInfo']['description']
    else:
        overview = None

    if 'imageLinks' in book['volumeInfo']:
        cover = book['volumeInfo']['imageLinks']['thumbnail']
    else:
        cover = None

    if 'publishedDate' in book['volumeInfo']:
        publish_date = book['volumeInfo']['publishedDate']
    else:
        publish_date = None

    books_in_db.append(crud.create_book(google_books_id=google_books_id,
                                        isbn_10 = isbn_10,
                                        isbn_13 = isbn_13,
                                        title = title,
                                        overview = overview,
                                        cover = cover,
                                        publish_date = publish_date))

model.db.session.add_all(books_in_db)
model.db.session.commit() 

"""AUTHORS"""

for book in book_data:

    author_list = book['volumeInfo']['authors']
    book_id = crud.get_book_by_googleid(book['id']).book_id

    for author in author_list: 
        if not crud.get_author_by_name(author):
            model.db.session.add(crud.create_author(author))
            model.db.session.commit()

    for author in author_list:
        author_id = crud.get_author_by_name(author).author_id
        model.db.session.add(crud.create_author_book_relationship(author_id, book_id))
        model.db.session.commit()


"""GENRES"""

for book in book_data:

    if 'categories' in book['volumeInfo']:
        genre_list = book['volumeInfo']['categories']
    else:
        genre_list = ["None"]

    book_id = crud.get_book_by_googleid(book['id']).book_id

    for genre in genre_list:
        if not crud.get_genre_by_name(genre):
            model.db.session.add(crud.create_genre(genre))
            model.db.session.commit()

    for genre in genre_list:
        genre_id = crud.get_genre_by_name(genre).genre_id
        model.db.session.add(crud.create_genre_book_relationship(genre_id, book_id))
        model.db.session.commit()

"""USERS"""

for n in range(1, 11):
    email = f'user{n}@test.com'
    password = 'test'
    personal_description = "Hi! I'm a test account!"
    shelf_name = "Test Bookshelf"
    private = True

    user = crud.create_user(email=email, 
                            password=password, 
                            personal_description=personal_description)

    model.db.session.add(user)
    model.db.session.commit()

    bookshelf = crud.create_bookshelf(shelf_name=shelf_name,
                                        user_id=n,
                                        private=private)

    model.db.session.add(bookshelf)
    model.db.session.commit()

    add_to_bookshelf = crud.create_shelf_book_relationship(n, n)

    model.db.session.add(add_to_bookshelf)
    model.db.session.commit()

    create_current_read = crud.create_current_read(n, n)

    model.db.session.add(create_current_read)
    model.db.session.commit()

    create_faved_book = crud.create_fav_book(n, n)

    model.db.session.add(create_faved_book)
    model.db.session.commit()
    print(crud.get_faved_books_by_user(n))