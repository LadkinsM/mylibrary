import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import NoImageProvided from '../images/NoImageProvided.png';
import { Col, Container, Row, Card, CardGroup } from 'react-bootstrap';

const Bookshelves = ({user, books}) => {
    //Display books for selected bookshelf.

    return(
        <React.Fragment>
            <Row>
                <Col md={{ span: 10 }}>
                    <CardGroup>
                        {books && books.map(book => {
                            return <Link to={`book_details/${book.book_id}`}>
                                        <Card className="card">
                                            {book.cover !== "Not Provided" ? <img src={book.cover} /> :
                                                                        <img src={NoImageProvided} /> }
                                            <Card.Title>{book.title}</Card.Title>
                                            <Card.Subtitle>{book.authors}</Card.Subtitle>
                                            <Card.Text>Published Date: {book.publish_date}</Card.Text>
                                        </Card>
                                    </Link>
                        })}
                    </CardGroup>
                </Col>
            </Row>
        </React.Fragment>
    )
};

export default Bookshelves;