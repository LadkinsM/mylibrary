#QUERIES

#TODO: User, Bookshelf, & Association Tables
"""

#Query by ID (Used for populating Book detail page)
    Get book by book id function  (book id)
        return book in where book id = book id

    Get author by author id function (author id)
        return author info where author id = author id

    Get genre by genre id function (genre id)
        return genre info where genre id = genre id

    Get language by language id function (language id)
        return language info where language id = language id


#Query by Other Methods (To check exsistence in database)
    Get author by name function (author name)

        split author name by space 
        last name is the last item in author name list
        join remainder of author name list and assign to first name 

        return author info where first name = first name and last name = last name

    Get genre by name function (genre name)
        return genre info where genre name = name 

    Get book by google id function (google_books_id)
        return book info where google_id = google_id

    Get language by name function (language name)
        return language info where language name = name

    Get Author_book_map function (author id, book id)
        return author book map info where author id = author id and book id = book id

    Get Genre_book_map function (genre id, book id)
        return genre book map info where genre id = genre id and book id = book id
"""

#CREATE

#TODO: User, Bookshelf, & Association Tables.
"""

    Create Author Function: (author name) (#I might change this to only name.)

        split author name by space
        last name is the last item in author name list
        join remainder of author name list and assign to first name

        return Author object

    Create Genre Function: (genre name)
        return Genre object

    Create Language Function: (language name)
        return Language object

    Create Author Book Relationship Function: (author id, book id)
        return Author Book Relationship object

    Create Genre Book Relationship Function: (genre id, book id)
        return Genre Book Relationship object

    Create Language Book Relationship Function: (language id, book id)
        return Language Book Relationship object

    Create Book Function: (google_books_id, isbn_10, isbn_13, title, overview,
                            cover, publish_date)
        return Book object

"""