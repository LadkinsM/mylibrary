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

    if search_criteria == "+all:":
        api_query = f'{api_url}{search_input}{max_results}'
    else:
        api_query = f'{api_url}{search_criteria}{search_input}{max_results}'

    books = requests.get(api_query).json()

    print(books)

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

    email = request.json.get('email')
    password = request.json.get('password')

    if email==None or password==None:
        return jsonify("You must complete all fields to sign up.")
    else:    
        user = crud.create_user(email, password)
        db.session.add(user)
        db.session.commit()
        new_user = crud.get_user_by_email(email)
        print(new_user.user_id)
        return jsonify({'user_id':f"{new_user.user_id}"})


@app.route('/login', methods=['POST'])
def login_user():
    """Login existing user."""

    email = request.json.get('email')
    print(email)
    password = request.json.get('password')
    print(password)

    user = crud.get_user_by_email(email)

    if user:
        if user.password == password:
            session['user'] = user.user_id
            print(user.user_id)
            return jsonify({
                            'user_id':user.user_id,
                            'email':user.email,
                            'personal_description':user.personal_description,
                        })
        else:
            return jsonify("Incorrect Password")
    else:
        return jsonify("Incorrect Email")


@app.route('/logout')
def logout_user():
    """Logout user in session."""

    del session['user']

    return "False"


@app.route('/user')
def user_logged_in():
    """Check for logged in user and return user ID."""

    if 'user' not in session:
        return "False"
    else:
        print(session['user'])
        return f"{session['user']}"


@app.route('/user/<user_id>/user_details')
def return_user_details(user_id):
    """Return user details for logged in user."""

    user = crud.get_user_by_id(user_id)
    current_read = user.current_reads

    return jsonify({
        'user_id':user.user_id,
        'email':user.email,
        'personal_description':user.personal_description,
    })


@app.route('/user/<user_id>/bookshelves')
def return_user_bookshelves(user_id):
    """Returns List of User's Bookshelves."""

    return json.dumps(crud.get_bookshelves_by_user(user_id))


@app.route('/user/<user_id>/bookshelves/<shelf_id>')
def return_bookshelf(user_id, shelf_id):
    """Return Books in Shelf"""
    print("****************")
    print(user_id, shelf_id)
    print("****************")

    return json.dumps(crud.get_books_by_shelf(shelf_id))


@app.route('/bookshelf/createshelf', methods=['POST'])
def create_bookshelf():
    user_id = request.json.get('user_id')
    shelf_name = request.json.get('name')
    private = request.json.get('private')

    shelf = crud.create_bookshelf(shelf_name, user_id, private)

    db.session.add(shelf)
    db.session.commit()

    return "Success"


@app.route('/bookshelf/addtoshelf/<shelf_id>/<book_id>')
def add_to_bookshelf(shelf_id, book_id):
    """Adds book to shelf."""

    book_to_add = crud.create_shelf_book_relationship(shelf_id, book_id)

    db.session.add(book_to_add)
    db.session.commit()

    if crud.get_shelf_book_map_by_id(shelf_id, book_id):
        return "Added"
    else:
        return "Failed"


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)