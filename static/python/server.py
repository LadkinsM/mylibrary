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

    api_request = requests.get(api_query).json()

    print(api_request['items'])

    


@app.route('/book/<googleID>', methods=["POST"])
def bookdetails(googleID):
    """
    Return Book Details
    """

    book = crud.get_book_by_googleid(googleID)


if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)