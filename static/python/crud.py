"""CRUD Operations"""

from model import (db, Book, Author, Genre, Language, User, Current_Read,
Bookshelf, Review, Author_book_map, Genre_book_map, Language_book_map,
Shelf_book_map, Faved_Book, connect_to_db)

#QUERIES

def get_book_by_googleid(google_books_id):
    """Return book info by google_books_id."""

    return Book.query.filter(Book.google_books_id == google_books_id).first()


def get_author_by_name(name):
    """Return author info by name."""

    return Author.query.filter(Author.name == name).first()


def get_genre_by_name(name):
    """Return genre info by name."""

    return Genre.query.filter(Genre.name == name).first()


def get_author_book_map_by_id(author_id, book_id):
    """Return author_book_id by author_id & book_id."""

    abmap = Author_book_map

    return abmap.query.filter(abmap.author_id == author_id, abmap.book_id == book_id).first()


def get_genre_book_map_by_id(genre_id, book_id):
    """Return book_genre_id by genre_id & book_id."""

    gbmap = Genre_book_map

    return gbmap.query.filter(gbmap.genre_id == genre_id, gbmap.book_id == book_id).first()


#BOOK RELATED
def create_author(author):
    """Create Author in database.
        
        Helper function for create_book."""

    return Author(name = author)


def create_author_book_relationship(author_id, book_id):
    """Creates relationship between book & author"""

    abmap = Author_book_map
    
    return abmap(author_id=author_id, book_id=book_id)


def create_genre(genre):
    """Create Genre in database.
    
        Helper function for create_book."""

    return Genre(name = genre)


def create_genre_book_relationship(genre_id, book_id):
    """Creates relationship between book & genre"""

    gbmap = Genre_book_map

    return gbmap(genre_id=genre_id, book_id=book_id)


def create_language(language):
    """Create Language in database.
        
        Helper function for create_book."""

    return Language(name = language)


def create_language_book_relationship(language_id, book_id):
    """Creates relationship between book & language"""

    lbmap = Language_book_map

    return lbmap(language_id=language_id, book_id=book_id)


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





if __name__ == '__main__':
    from server import app
    connect_to_db(app)