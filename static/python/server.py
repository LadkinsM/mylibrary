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

    books = requests.get(api_query).json()

    #Add API Book Data to DB
    books_to_db = []
    book_items = books['items']
    google_ids = set()
    
    for book in book_items:
        if crud.get_book_by_googleid(book['id']) == None:
            if not book['id'] in google_ids:
                books_to_db.append(crud.handle_book(book))
                google_ids.add(book['id'])

    
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

    return json.dumps(crud.handle_search(search_criteria, search_input))


@app.route('/book/<bookID>/book_details')
def bookdetails(bookID):
    """
    Return Book Details
    """

    book = crud.get_book_by_bookid(bookID)

    return jsonify(book)

@app.route('/signup', methods=['POST'])
def create_user():
    """Create New User."""

    email = request.form.get('email')
    print(email)
    password = request.form.get('password')
    personal_description = request.form.get('personal_description')

    if email==None or password==None or personal_description==None:
        return jsonify("You must complete all fields to sign up.")
    else:    
        user = crud.create_user(email, password, personal_description)
        db.session.add(user)
        db.session.commit()
        return jsonify("Success")


@app.route('/login', methods=['POST'])
def confirm_user():
    """Login existing user."""

    email = request.json.get('email')
    print(email)
    password = request.json.get('password')
    print(password)

    user = crud.get_user_by_email(email)

    if user:
        if user.password == password:
            session['user'] = user.user_id
            return jsonify(user)
        else:
            return jsonify("Incorrect Password")
    else:
        return jsonify("Incorrect Email")


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)