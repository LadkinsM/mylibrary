from flask import (Flask, render_template, request, flash, session,
                   redirect, jsonify)
from static.python.model import connect_to_db, db
# from secrets.sh import secret_key

app = Flask(__name__)
app.secret_key = "dev"

@app.route('/')
def homepage():
    """Homepage"""

    return render_template('index.html')

if __name__ == "__main__":

    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)