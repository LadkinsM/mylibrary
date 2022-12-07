"""CRUD Operations"""

from model import (db, Book, Author, Genre, Language, User, Current_Read,
Bookshelf, Review, Author_book_map, Genre_book_map, Language_book_map,
Shelf_book_map, Faved_Book, connect_to_db)
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import joinedload

#QUERIES

def get_book_by_googleid(google_books_id):
    """Return book info by google_books_id."""

    return Book.query.filter(Book.google_books_id == google_books_id).first()

def get_book_by_bookid(book_id):
    """Return book info by book_id"""

    book = Book.query.filter(Book.book_id == book_id).first()

    return {
            'book_id' : book.book_id,
            'title' : book.title,
            'overview' : book.overview,
            'cover' : book.cover,
            'publish_date' : book.publish_date,
            'isbn_10' : book.isbn_10,
            'isbn_13' : book.isbn_13,
            }

def get_books_by_author(author_id):
    """Return all books by author via author_id."""

    return Book.query.join(Author_book_map).join(Author).filter(Author.author_id == author_id).all()


def get_books_by_genre(genre_id):
    """Return all books by genre via genre_id."""

    return Book.query.join(Genre_book_map).join(Genre).filter(Genre.genre_id == genre_id).all()


def get_author_by_name(name):
    """Return author info by name."""

    return Author.query.filter(Author.name == name).first()


def get_authors_by_book(book_id):
    """Return all authors by book via book_id."""

    book = Book.query.filter(Book.book_id == book_id).first()
    authors_list = []

    for author in book.authors:
        authors_list.append({'author_id':author.author_id, 'name':author.name})

    return authors_list


def get_genre_by_name(name):
    """Return genre info by name."""

    return Genre.query.filter(Genre.name == name).first()


def get_genres_by_book(book_id):

    book = Book.query.filter(Book.book_id == book_id).first()
    genres_list = []

    for genre in book.genres:
        genres_list.append({'genre_id':genre.genre_id, 'name':genre.name})

    return genres_list


def get_reviews_by_book(book_id):
    """Returns all reviews by book id."""

    book = Book.query\
            .join(Review, Review.book_id==Book.book_id)\
            .join(User, User.user_id==Review.user_id)\
            .filter(Book.book_id == book_id).first()

    return handle_reviews(book.reviews)


def get_reviews_by_user(user_id):
    """Returns all reviews by user id."""

    user = User.query\
            .join(Review, Review.user_id==User.user_id)\
            .join(Book, Review.book_id==Book.book_id)\
            .filter(User.user_id==user_id).first()
    
    return handle_reviews(user.reviews)


def get_review_by_id(review_id):
    """Returns review by review id."""

    return Review.query.filter(Review.review_id==review_id).first()


def get_author_book_map_by_id(author_id, book_id):
    """Return author_book_id by author_id & book_id."""

    abmap = Author_book_map

    return abmap.query.filter(abmap.author_id == author_id, abmap.book_id == book_id).first()


def get_genre_book_map_by_id(genre_id, book_id):
    """Return book_genre_id by genre_id & book_id."""

    gbmap = Genre_book_map

    return gbmap.query.filter(gbmap.genre_id == genre_id, gbmap.book_id == book_id).first()


def get_shelf_book_map_by_id(shelf_id, book_id):
    """Return shelf_book_id by shelf_id & book_id."""

    sbmap = Shelf_book_map

    return sbmap.query.filter(sbmap.shelf_id == shelf_id, sbmap.book_id == book_id).first()


def get_user_by_email(email):
    """Return user info by user email"""

    return User.query.filter(User.email == email).first()


def get_user_by_id(user_id):
    """Return user info by user id"""

    return User.query.options(joinedload(User.current_reads)).filter(User.user_id == user_id).first()


def get_current_read_by_user(user_id):
    """Return a user's current read."""

    return Current_Read.query.filter(Current_Read.user_id == user_id, Current_Read.is_active == True).first()


def get_faved_books_by_user(user_id):
    """Return a user's faved books."""

    return Faved_Book.query.filter(Faved_Book.user_id == user_id).all()


def get_bookshelves_by_user(user_id):
    """Return a list of all bookshelves created by user."""

    shelves_list = Bookshelf.query.filter(Bookshelf.user_id == user_id).all()
    shelves_info = []

    for shelf in shelves_list:
        shelves_info.append({'name':shelf.shelf_name, 'private':shelf.private, 'shelf_id':shelf.shelf_id})

    return shelves_info


def get_shelf_by_id(shelf_id):
    """Return shelf by shelf id."""

    return Bookshelf.query.filter(Bookshelf.shelf_id == shelf_id).first()


def get_books_by_shelf(shelf_id):
    """Return all books on shelf by shelf id"""

    shelf = get_shelf_by_id(shelf_id)
    books_list = []

    for book in shelf.books:
        books_list.append({
            'book_id' : book.book_id,
            'title' : book.title,
            'overview' : book.overview,
            'cover' : book.cover,
            'publish_date' : book.publish_date,
            'isbn_10' : book.isbn_10,
            'isbn_13' : book.isbn_13,
            }
        )

    return books_list


def get_all_users():
    """
    Return all user info in database.
    Only to be used when seeding database & statistics.

    """
    return User.query.all()


def handle_search(search_criteria, search_input):
    """Search Tables by search input and return result list."""

    if search_criteria == "+intitle:":
        books_list = Book.query.filter(Book.title.ilike(f"%{search_input}%")).all()
            
    elif search_criteria == "+inauthor:":
        books_list = Book.query.join(Author_book_map).join(Author).filter(Author.name.ilike(f"%{search_input}%")).all()

    elif search_criteria == "+subject:":
        books_list = Book.query.join(Genre_book_map).join(Genre).filter(Genre.name.ilike(f"%{search_input}%")).all()
    
    else:
        books_list = db.session.query(Book)\
                .join(Author_book_map,Author_book_map.book_id==Book.book_id)\
                .join(Author,Author.author_id==Author_book_map.author_id)\
                .join(Genre_book_map,Genre_book_map.book_id==Book.book_id)\
                .join(Genre,Genre.genre_id==Genre_book_map.genre_id)\
                .filter(db.or_(Book.title.contains(f"{search_input}"),
                Author.name.contains(f"{search_input}"),
                Genre.name.contains(f"{search_input}")
                )).all()

    book_results = []
    
    for book in books_list: 
        book_results.append({
            'book_id' : book.book_id,
            'title' : book.title,
            'overview' : book.overview,
            'cover' : book.cover,
            'publish_date' : book.publish_date,
            'isbn_10' : book.isbn_10,
            'isbn_13' : book.isbn_13,
            'authors' : get_authors_by_book(book.book_id)[0]['name'],
            'genres' : get_genres_by_book(book.book_id)[0]['name']
        })

    return book_results


#BOOK RELATED

def create_author(author):
    """Create Author in database.
        
        Helper function for create_book."""

    return Author(name = author)


def create_author_book_relationship(author_id, book_id):
    """Creates relationship between book & author"""

    abmap = Author_book_map
    
    return abmap(author_id=author_id, book_id=book_id)


def handle_authors(author_list, book_id):
    """Handles API Author Data, Checks for presence in DB, and Adds to DB."""
    
    for author in author_list: 
        if not get_author_by_name(author):
            db.session.add(create_author(author))
            db.session.commit()

    for author in author_list:
        author_obj = get_author_by_name(author)

        if not get_author_book_map_by_id(author_obj.author_id, book_id):
            db.session.add(create_author_book_relationship(author_obj.author_id, book_id))
            db.session.commit()


def create_genre(genre):
    """Create Genre in database.
    
        Helper function for create_book."""

    return Genre(name = genre)


def create_genre_book_relationship(genre_id, book_id):
    """Creates relationship between book & genre"""

    gbmap = Genre_book_map

    return gbmap(genre_id=genre_id, book_id=book_id)


def handle_genres(genre_list, book_id):
    """Handles API Genre Data, Checks for presence in DB, and Adds to DB."""
    
    for genre in genre_list: 
        if not get_genre_by_name(genre):
            db.session.add(create_genre(genre))
            db.session.commit()

    for genre in genre_list:
        genre_id = get_genre_by_name(genre).genre_id

        if not get_genre_book_map_by_id(genre_id, book_id):
            db.session.add(create_genre_book_relationship(genre_id, book_id))
            db.session.commit()


def create_language(language):
    """Create Language in database.
        
        Helper function for create_book."""

    return Language(name = language)


def create_language_book_relationship(language_id, book_id):
    """Creates relationship between book & language"""

    lbmap = Language_book_map

    return lbmap(language_id=language_id, book_id=book_id)


def create_shelf_book_relationship(shelf_id, book_id):
    """Creates relationship between book & bookshelf"""

    sbmap = Shelf_book_map

    return sbmap(shelf_id=shelf_id, book_id=book_id)


def create_book(google_books_id, 
                isbn_10,
                isbn_13,
                title, 
                overview, 
                cover, 
                publish_date,
                ):
    """Create Book"""
    
    return Book(google_books_id=google_books_id,
                isbn_10 = isbn_10,
                isbn_13 = isbn_13,
                title = title,
                overview = overview,
                cover = cover,
                publish_date = publish_date)


def handle_book(book):
    """
    Handles API Book Data, Checks for Field presence in Response,
    Checks for Book presence in DB, and Creates Book Object.
    """

    google_books_id = book['id']

    if(book['volumeInfo'].get('title') is None):
        title = "Not Titled"
    else:
        title = book['volumeInfo']['title']

    if (book['volumeInfo'].get('industryIdentifiers') is None):
        isbn_13 = 0
        isbn_10 = 0
    else:
        isbn_list = book['volumeInfo'].get('industryIdentifiers')
        for info in isbn_list:
            if 'ISBN_10' not in info or 'ISBN_13' not in info:
                isbn_10 = 0
                isbn_13 = 0
            elif info['type'] == 'ISBN_10':
                isbn_10 = info['identifier']
            elif info['type'] == 'ISBN_13':
                isbn_13 = info['identifier']
            else:
                continue

    if (book['volumeInfo'].get('description')is None):
        overview = "Not Provided"
    else:
        overview = book['volumeInfo']['description']

    if (book['volumeInfo'].get('imageLinks') is None):
        cover = "Not Provided"
    else:
        cover = book['volumeInfo']['imageLinks']['thumbnail']
    
    if (book['volumeInfo'].get('publishedDate') is None):
        publish_date = "Not Provided"
    else:
        publish_date = book['volumeInfo']['publishedDate']

    return Book(
                google_books_id=google_books_id,
                isbn_10 = isbn_10,
                isbn_13 = isbn_13,
                title = title,
                overview = overview,
                cover = cover,
                publish_date = publish_date
                )

#USER RELATED

def create_user(email, password, personal_description=""):
    """Creates a user"""

    return User(email=email, password=password, personal_description=personal_description)


def create_review(user_id, book_id, score, comment):
    """Creates a Review"""

    return Review(user_id=user_id, book_id=book_id, score=score, comment=comment)


def edit_review(review_id, score, comment):
    """Edit a Review"""

    active_review = get_review_by_id(review_id)

    active_review.score = score
    active_review.comment = comment

    db.session.commit()


def create_bookshelf(shelf_name, user_id, private):
    """Creates a Bookshelf"""

    return Bookshelf(shelf_name=shelf_name, user_id=user_id, private=private)


def create_fav_book(user_id, book_id):
    """Creates a Faved Book"""

    return Faved_Book(user_id=user_id, book_id=book_id)


def deactivate_current_read(user_id):
    """Deactivates Users Current Read."""

    current_read = get_current_read_by_user(user_id)

    current_read.is_active = False

    db.session.commit()


def create_current_read(user_id, book_id, is_active=True):
    """Creates a users current read."""

    return Current_Read(user_id=user_id, book_id=book_id, is_active=is_active)


def add_to_bookshelf(shelf_id, book_id):
    """Adds a book to bookshelf."""

    if get_shelf_book_map_by_id(shelf_id, book_id):
        return False
    else:
        create_shelf_book_relationship(shelf_id, book_id)
        return True

#REVIEWS

def handle_reviews(reviews):

    review_results = []

    for review in reviews:
        review_results.append({
            'review_id' : review.review_id,
            'book_id' : review.book_id,
            'title' : review.books.title,
            'user_id' : review.user_id,
            'username' : review.user.email,
            'score' : review.score,
            'comment' : review.comment,
        })

    return review_results



if __name__ == '__main__':
    from server import app
    connect_to_db(app)