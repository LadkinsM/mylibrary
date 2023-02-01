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

# with open('../json/books_seed.json') as f:
#     book_data = json.loads(f.read())['items']

# books_in_db = []

# for book in book_data:

#     """BOOKS"""

#     google_books_id = book['id']

#     isbn_list = book['volumeInfo']['industryIdentifiers']

#     for info in isbn_list:
#         if info['type'] == 'ISBN_13':
#             isbn_13 = info['identifier']
#         elif info['type'] == 'ISBN_10':
#             isbn_10 = info['identifier']

#     title = book['volumeInfo']['title']
    
#     if 'description' in book['volumeInfo']:
#         overview = book['volumeInfo']['description']
#     else:
#         overview = None

#     if 'imageLinks' in book['volumeInfo']:
#         cover = book['volumeInfo']['imageLinks']['thumbnail']
#     else:
#         cover = None

#     if 'publishedDate' in book['volumeInfo']:
#         publish_date = book['volumeInfo']['publishedDate']
#     else:
#         publish_date = None

#     books_in_db.append(crud.create_book(google_books_id=google_books_id,
#                                         isbn_10 = isbn_10,
#                                         isbn_13 = isbn_13,
#                                         title = title,
#                                         overview = overview,
#                                         cover = cover,
#                                         publish_date = publish_date))

# model.db.session.add_all(books_in_db)
# model.db.session.commit() 

# """AUTHORS"""

# for book in book_data:

#     author_list = book['volumeInfo']['authors']
#     book_id = crud.get_book_by_googleid(book['id']).book_id

#     for author in author_list: 
#         if not crud.get_author_by_name(author):
#             model.db.session.add(crud.create_author(author))
#             model.db.session.commit()

#     for author in author_list:
#         author_id = crud.get_author_by_name(author).author_id
#         model.db.session.add(crud.create_author_book_relationship(author_id, book_id))
#         model.db.session.commit()


# """GENRES"""

# for book in book_data:

#     if 'categories' in book['volumeInfo']:
#         genre_list = book['volumeInfo']['categories']
#     else:
#         genre_list = ["None"]

#     book_id = crud.get_book_by_googleid(book['id']).book_id

#     for genre in genre_list:
#         if not crud.get_genre_by_name(genre):
#             model.db.session.add(crud.create_genre(genre))
#             model.db.session.commit()

#     for genre in genre_list:
#         genre_id = crud.get_genre_by_name(genre).genre_id
#         model.db.session.add(crud.create_genre_book_relationship(genre_id, book_id))
#         model.db.session.commit()

# """USERS"""

# username_list = [
#                 'whatafireads@test.com',
#                 'abibliophobia@test.com',
#                 'foreverbooked@test.com',
#                 'bookishbrain@test.com',
#                 'tea.and.tomes@test.com',
#                 'boundbybooks@test.com',
#                 'literaryaura@test.com',
#                 'thelostbookmark@test.com',
#                 'mydiverseshelf@test.com',
#                 'the_write_stuff@test.com'
#                 ]

# personal_description_list = [
#                         "I'm a sucker for a good book and a even better love story. I'm passionate about everything I do, whether it's work, hobby, or love.",
#                         "I love books and horror! I'm always looking for new stories to read and frighten myself with.",
#                         "Books, craft, and fantasy are my life. I love to read and explore new worlds, and I love to make things by hand. I'm always looking for new adventures, both in books and in real life.",
#                         "Lover of books, especially period-dramas. You can usually find me with my nose in a book, or watching a movie adaptation.",
#                         "I'm a bookworm who loves tea and yarn. I love curling up with a good book, and I'm also an avid knitter. I love spending my free time reading, knitting, and exploring new teas.",
#                         "Libraries, books, and sci-fi are my passion. I can often be found with my nose in a book, or lost in a library. I love to explore new worlds, both real and imaginary.",
#                         "Shelf after shelf of novels, histories, biographies, and more. This is my haven, my escape, my happy place. Books are my passion and I love nothing more than spending a lazy afternoon with a new story.",
#                         "I'm a bookworm and I love nothing more than getting lost in a good story. I'm always up for a new adventure, whether it's in the pages of a book or in real life.",
#                         "Author and avid reader. I spend most of my free time with my nose in a book. Whether I'm curled up on the couch with a cup of tea or sitting in the sun at the park, you'll usually find me reading.",
#                         "I like books. A lot. If I'm not reading, I'm probably writing them. Or thinking about them. Or talking about them."
#                         ]

# for n in range(10):
#     email = username_list[n]
#     password = 'test'
#     personal_description = personal_description_list[n]
#     # shelf_name = "Liked Books"
#     # private = True

#     user = crud.create_user(email=email, 
#                             password=password, 
#                             personal_description=personal_description)

#     model.db.session.add(user)
#     model.db.session.commit()