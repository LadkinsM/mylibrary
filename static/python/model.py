"""Define MyLibrary Model Classes"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


#ASSOCIATION TABLES

class Author_book_map(db.Model):
    """Data model for authors for each book."""

    __tablename__="authors_books"

    author_book_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    author_id = db.Column(db.Integer, db.ForeignKey('authors.author_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'), nullable=False)

    def __repr__(self):
        return f"<Book Author author_id={self.author_id}, book_id={self.book_id}>"


class Genre_book_map(db.Model):
    """Data model for genre/subgenre for each book."""

    __tablename__="genres_books"

    book_genre_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.genre_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'), nullable=False)

    def __repr__(self):
        return f"<Book Genre genre_id={self.genre_id}, book_id={self.book_id}>"


class Language_book_map(db.Model):
    """Data model for each language per book."""

    __tablename__="languages_books"

    language_book_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.language_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'), nullable=False)

    def __repr__(self):
        return f"<Book Language language_id={self.language_id}, book_id={self.book_id}>"


class Shelf_book_map(db.Model):
    """Data model for each book per shelf."""

    __tablename__="shelves_books"

    shelf_book_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    shelf_id = db.Column(db.Integer, db.ForeignKey('bookshelves.shelf_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'), nullable=False)

    def __repr__(self):
        return f"<Book on Shelf shelf_id={self.shelf_id}, book_id={self.book_id}>"


#BOOKS

class Book(db.Model):
    """Data model for a book."""

    __tablename__="books"

    book_id = db.Column(db.Integer, primary_key=True)
    google_books_id = db.Column(db.String, nullable=False, unique=True)
    isbn_10 = db.Column(db.String, nullable=True)
    isbn_13 = db.Column(db.String, nullable=True)
    title = db.Column(db.String, nullable=False)
    overview = db.Column(db.String, nullable=True)
    cover = db.Column(db.String, nullable=True)
    publish_date = db.Column(db.String, nullable=True)

    #Association Table Relationships
    authors = db.relationship("Author", secondary="authors_books", back_populates="books")
    genres = db.relationship("Genre", secondary="genres_books", back_populates="books")
    languages = db.relationship("Language", secondary="languages_books", back_populates="books")
    faved_by = db.relationship("User", secondary="faved_books", back_populates="faved_books")
    bookshelves = db.relationship("Bookshelf", secondary="shelves_books", back_populates="books")

    #Book to User Table Relationships
    current_reads = db.relationship("Current_Read", back_populates="books")
    reviews = db.relationship("Review", back_populates="books")

    def __repr__(self):
        return f"<Book book_id={self.book_id} title={self.title}>"


class Author(db.Model):
    """Data model for an author."""

    __tablename__="authors"

    author_id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)

    books = db.relationship("Book", secondary="authors_books", back_populates="authors")

    def __repr__(self):
        return f"<Author author_id={self.author_id} name={self.name}>"


class Genre(db.Model):
    """Data model for Genre/SubGenre."""

    __tablename__="genres"

    genre_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)

    books = db.relationship("Book", secondary="genres_books", back_populates="genres")

    def __repr__(self):
        return f"<Genre genre_id={self.genre_id} name={self.name}>"


class Language(db.Model):
    """Data model for Language."""

    __tablename__="languages"

    language_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)

    books = db.relationship("Book", secondary="languages_books", back_populates="languages")

    def __repr__(self):
        return f"<Language language_id={self.language_id} name={self.name}>"

#USERS

class User(db.Model):
    """Data model for a user."""

    __tablename__="users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    personal_description = db.Column(db.String(250), nullable=True)

    #Association Table Relationships
    faved_books = db.relationship("Book", secondary="faved_books", back_populates="faved_by")
    
    #User to Book Table Relationships
    current_reads = db.relationship("Current_Read", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")
    bookshelves = db.relationship("Bookshelf", back_populates="user")


    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Current_Read(db.Model):
    """Data model for book that user is currently reading."""

    __tablename__="current_reads"

    current_read_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'), nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)

    books = db.relationship("Book", back_populates="current_reads")
    user = db.relationship("User", back_populates="current_reads")

    def __repr__(self):
        return f"<Current Read user_id={self.user_id}, book_id={self.book_id}, is_active={self.is_active}>"


class Bookshelf(db.Model):
    """Data model for Bookshelf."""

    __tablename__="bookshelves"

    shelf_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    shelf_name = db.Column(db.String, nullable=False)
    # shelf_description = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    private = db.Column(db.Boolean, nullable=False, default=False)

    #Bookshelf to User Relationships
    user = db.relationship("User", back_populates="bookshelves")

    #Bookshelf to Book Relationships
    books = db.relationship("Book", secondary="shelves_books", back_populates="bookshelves")


    def __repr__(self):
        return f"<Bookshelf name={self.shelf_name}, user_id={self.user_id}>"


class Review(db.Model):
    """Data model for Review."""

    __tablename__="reviews"

    review_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(500), nullable=False)

    books = db.relationship("Book", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")

    def __repr__(self):
        return f"<Review id={self.review_id}, score={self.score}>"


class Faved_Book(db.Model):
    """Data model for book that is favorited."""

    __tablename__="faved_books"

    faved_book_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.book_id'), nullable=False)

    def __repr__(self):
        return f"<Faved Book user_id={self.user_id}, book_id={self.book_id}>"





# Helper functions

def connect_to_db(app, db_uri="postgresql:///mylibrary", echo=False):
    """Connect to database."""

    # Configure to use our Postgres database
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_ECHO'] = echo
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    from server import app

    connect_to_db(app)