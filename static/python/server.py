from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify, json)
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


@app.route('/api/<search_input>/<search_criteria>')
def search_results(search_input, search_criteria):
    """
    Sends API Request, Adds Response to DB, Returns Results.
    """

    api_url = 'https://www.googleapis.com/books/v1/volumes?q='
    max_results = "&maxResults=40"
    api_query = f'{api_url}{search_criteria}{search_input}{max_results}'

    print(api_query)

    books = requests.get(api_query).json()


    #Add API Book Data to DB
    books_to_db = []
    book_items = books['items']
    
    for book in book_items:
        if not crud.get_book_by_googleid(book['id']):
            books_to_db.append(crud.handle_book(book))
    
    db.session.add_all(books_to_db)
    db.session.commit()
    
    #Add API Author/Genre Data for Book to DB
    for book in book_items:

        if 'authors' in book['volumeInfo']:
            author_list = book['volumeInfo']['authors']
        else:
            author_list = ["None"]
    
        book_obj = crud.get_book_by_googleid(book['id'])

        crud.handle_authors(author_list, book_obj.book_id)

        if 'categories' in book['volumeInfo']:
            genre_list = book['volumeInfo']['categories']
        else:
            genre_list = ["None"]

        crud.handle_genres(genre_list, book_obj.book_id)
    print(len(crud.handle_search(search_criteria, search_input)))
    return json.dumps(crud.handle_search(search_criteria, search_input))



@app.route('/book/<bookID>/book_details')
def bookdetails(bookID):
    """
    Return Book Details
    """

    book = crud.get_book_by_bookid(bookID)

    return jsonify(book)


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)