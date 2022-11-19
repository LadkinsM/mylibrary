from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from model import connect_to_db, db
import requests
import crud
# from secrets.sh import secret_key

app = Flask(__name__)
app.secret_key = "dev"

@app.route('/')
def homepage():
    """Homepage"""

    return "Hello World!"


@app.route('/api/<search_criteria><search_input>')
def search_results(search_criteria, search_input):
    """
    Sends API Request, Adds Response to DB, Returns Results.
    """

    api_url = 'https://www.googleapis.com/books/v1/volumes?q='
    api_query = f'{api_url}{search_criteria}{search_input}'

    books = requests.get(api_query).json()

    #Add API Book Data to DB
    books_to_db = []
    
    for book in books:

        books_to_db.append(crud.handle_book(book))

    db.session.add_all(books_to_db)
    db.session.commit()
    
    #Add API Author/Genre Data for Book to DB
    for book in books:

        author_list = books['volumeInfo'].get('authors', [])
        book_id = crud.get_book_by_googleid(books['id']).book_id

        crud.handle_authors(author_list, book_id)

        genre_list = book['volumeInfo'].get('categories', [])

        crud.handle_genres(genre_list, book_id)

    





@app.route('/book/<bookID>/details', methods=["POST"])
def bookdetails(bookID):
    """
    Return Book Details
    """

    book = crud.get_book_by_bookid(bookID)

    return book


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)