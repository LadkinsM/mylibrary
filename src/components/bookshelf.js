import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import NoImageProvided from '../images/NoImageProvided.png';
import { Col, Container, Row, Card, CardGroup } from 'react-bootstrap';

const Bookshelves = ({user, books}) => {
    //Display books for selected bookshelf.

    return(
        <React.Fragment>
                    <CardGroup className='bookshelf-container'>
                        {books && books.map(book => {
                            return <Link to={`book_details/${book.book_id}`} className='card_link'>
                                        <Card className="card" key={book.book_id}>
                                            {book.cover !== "Not Provided" ? <Card.Img variant="top" src={book.cover} /> :
                                                                        <Card.Img variant="top" src={NoImageProvided} /> }
                                            <Card.Title>{book.title}</Card.Title>
                                            <Card.Subtitle>{book.authors}</Card.Subtitle>
                                            <Card.Text>Published Date: {book.publish_date}</Card.Text>
                                        </Card>
                                    </Link>
                        })}
                    </CardGroup>
        </React.Fragment>
    )
};

export default Bookshelves;