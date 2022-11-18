"""CRUD Operations"""

from model import (db, Book, Author, Genre, Language, User, Current_Read,
Bookshelf, Review, Author_book_map, Genre_book_map, Language_book_map,
Shelf_book_map, Faved_Book, connect_to_db)

#QUERIES

def get_book_by_googleid(google_books_id):
    """Return book info by google_books_id."""

    return Book.query.filter(Book.google_books_id == google_books_id).first()


def get_book_by_author(author_id):
    """Return all books by author via author_id."""

    return Book.query.filter(Book.authors.author_id == author_id).all()


def get_book_by_genre(genre_id):
    """Return all books by genre via genre_id."""

    return Book.query.filter(Book.genres.genre_id == genre_id).all()


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


def get_shelf_book_map_by_id(shelf_id, book_id):
    """Return shelf_book_id by shelf_id & book_id."""

    sbmap = Shelf_book_map

    return sbmap.query.filter(sbmap.shelf_id == shelf_id, sbmap.book_id == book_id).first()


def get_user_by_email(email):
    """Return user info by user email"""

    return User.query.filter(User.email == email).first()


def get_current_read_by_user(user_id):
    """Return a user's current read."""

    return Current_Read.query.filter(Current_Read.user_id == user_id).first()


def get_faved_books_by_user(user_id):
    """Return a user's faved books."""

    return Faved_Book.query.filter(Faved_Book.user_id == user_id).all()


def get_bookshelves_by_user(user_id):
    """Return a list of all bookshelves created by user."""

    return Bookshelf.query.filter(Bookshelf.user_id == user_id).all()


def get_all_users():
    """
    Return all user info in database.
    Only to be used when seeding database & statistics.

    """
    return User.query.all()

    



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
        author_id = get_author_by_name(author).author_id
        db.session.add(create_author_book_relationship(author_id, book_id))
        db.session.commit()


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
    Checks for Book presence in DB, and Adds Book object to List.
    """

    if not get_book_by_googleid(book['id']).book_id:
        google_books_id = book['id']
        title = book['volumeInfo']['title']

        #Assign ISBN variables
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

        #Check Description Presence
        if 'description' in book['volumeInfo']:
            overview = book['volumeInfo']['description']
        else:
            overview = None

        #Check ImageLinks Presence
        if 'imageLinks' in book['volumeInfo']:
            cover = book['volumeInfo']['imageLinks']['thumbnail']
        else:
            cover = None

        #Check PublishedDate Presence
        if 'publishedDate' in book['volumeInfo']:
            publish_date = book['volumeInfo']['publishedDate']
        else:
            publish_date = None

        book_to_add = create_book(
                        google_books_id=google_books_id,
                        isbn_10 = isbn_10,
                        isbn_13 = isbn_13,
                        title = title,
                        overview = overview,
                        cover = cover,
                        publish_date = publish_date
                        )
        


#USER RELATED

def create_user(email, password, personal_description):
    """Creates a user"""

    return User(email=email, password=password, personal_description=personal_description)


def create_bookshelf(shelf_name, user_id, private):
    """Creates a Bookshelf"""

    return Bookshelf(shelf_name=shelf_name, user_id=user_id, private=private)


def create_fav_book(user_id, book_id):
    """Creates a Faved Book"""

    return Faved_Book(user_id=user_id, book_id=book_id)


def create_current_read(user_id, book_id, is_active=True):
    """Creates a users current read."""

    return Current_Read(user_id=user_id, book_id=book_id, is_active=is_active)


#HELPER FUNCTIONS



if __name__ == '__main__':
    from server import app
    connect_to_db(app)