# ![myLibrary](https://github.com/LadkinsM/mylibrary/blob/main/static/readme_images/myLibrarytxt.png "My Library Text")

MyLibrary is a personal library application that assists avid readers with maintaining a record of books via their own curated bookshelves.  Through of the use of a search feature, users have access to the vast library of books within the MyLibrary database. Search results can be further narrowed down through criteria such as title, author, and genre depending on the users needs. The user profile page, available to account holders, allows the user to create and view their custom bookshelves. In addition, it provides a record of all reviews that user has created with the added capability of editing each review from the profile page.

Learn more about the developer: https://www.linkedin.com/in/mauri-adkins/

## Table of Contents
* [Technologies Used] (#technologies)
* [Features] (#features)
* [Deploy MyLibrary Locally] (#installation)

## <a name="technologies"></a>Technologies Used
* Python (3.8.10)
* Javascript (node v18.12.1)
* Flask
* React
* PostgreSQL
* SQLAlchemy
* HTML
* CSS
* React-Bootstrap

## <a name="features"></a>Features

#### Search

The search feature gives the user the ability to search by...
* All Results
* Title
* Author
* Genre

In order to create a diverse library for the user to search from and to provide a greater volume of responses, a hybrid method of seeding the database was implemented. If you run myLibrary locally, you are provided a seed_database.py file to setup your initial database. This file paired with the  books_seed.json file will setup your database, provide a base set of users, and provide a base set of 10 books. Once running, the search feature will add book data to the database. When the user submits the search form, the user input and search criteria are used by the server to make an api request to the google books api. This data is then parsed by the server and added to the MyLibrary database. After this occurse, the original user input and search criteria is made against the MyLibrary database and the resulting book data is returned to the user. In addition to slowly growing the database, this also provides a larger response volume per search to the user.

#### Book Details

Clicking on a Book Card (from search results, bookshelves, or currently reading) will direct the user to that book's book details page. The book details page displays information about the book such as...
* Cover
* Title
* Author
* Description
* Publish Date

##### Review Component (Book Details)

On the Book Details page, a review component displays the reviews that have been added for that specific book. Users have the ability to add reviews, and edit their own reviews they've added in the past.

##### User Toolbar (Set Current Read, Add to Bookshelf)

The user toolbar component (UserBookComp) is present on the book details page when the user is logged in. Through the use of this toolbar, users have the ability to set the book as their current read, or add the book to a bookshelf by selecting one of their custom bookshelfs from the drop down menu. 

#### User Details

Each user has access to their user details page, which serves as the hub for their personal library. The User Details page is the holding place for features such as...

##### Bookshelves
Users are able to create custom bookshelves, or view the bookshelves they have created. Through the use of useEffect Hooks, when a user creates a new bookshelf, the bookshelf component will re-render so the user can select their new bookshelf immediately. Once a bookshelf is selected, books will be displayed via the same cards as the search results page. Users can click on the cards to be directed to that books book details page. If the bookshelf is empty, the user will be directed to the Search feature to add books to their new bookshelf.

##### Review Component (User Details)
The review component on the user details page displays the reviews that the users has created. Users have the ability to edit their reviews from the user details page.

#### Users
As MyLibrary is a web application centered around giving users the ability to create their personal libraries, user accounts were a necessity. Users can login into their account via the login page, if they do not have an account, a link to the sign up form is present at login. 

Certain features are only available to account holders...
* User Details Page
* Adding Reviews
* Bookshelves

#### Modals
A smaller challenge was that I didn't want to pull the user away from the user details or book details pages just to update one component. As a solution, I implemented modals from the react-bootstrap library. These are used when a user wants to create a new shelf, add a review, or edit an exsisting review. 

## <a name="installation"></a>How to locally run MyLibrary
MyLibrary has not been deployed as of this posting. The below instructions are for running it locally on your maching.

1. If you have not already, you will need to install PostgreSQL. 
2. Once you've cloned (or forked) the MyLibrary repository, create a virtual environment, activate it, and install the depencies located in the requirements.txt file.
3. Setup your database by running the seed_database.py file located in the static/python folder. This file will reference the books_seed.json file located in the static/json folder.
4. From the python folder, start your flask server by running 'python3 server.py'. 
5. You will need to run the react front-end from a separate terminal window. Once you have created your new terminal window, reached the main mylibraryapp directory, and activated your virtual environment, start the MyLibrary app by running 'npm start' to run the app in development mode.
