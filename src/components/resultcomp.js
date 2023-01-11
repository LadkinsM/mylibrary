import React from 'react';
import { Link } from 'react-router-dom';
import NoImageProvided from '../images/NoImageProvided.png';
import { Card, CardGroup } from 'react-bootstrap';
import '../App.css';


const ResultDisplay = (props) => {
    //Display results from search input.

    const results = props.results

    return(
        <React.Fragment>
                <CardGroup className="card-container">
                {results && results.map(result => {
                    return <Link to={`book_details/${result.book_id}`} className='card_link'>
                                <Card className="card" key={result.book_id}>
                                    {result.cover !== "Not Provided" ? <Card.Img variant="top" src={result.cover} /> : 
                                                                    <Card.Img variant="top" src={NoImageProvided} /> }
                                    <Card.Title>{result.title}</Card.Title>
                                    <Card.Subtitle>{result.authors}</Card.Subtitle>
                                    <Card.Text>Published Date: {result.publish_date}</Card.Text>
                                </Card>
                            </Link>
                })}
                </CardGroup>
        </React.Fragment>
    )
}

export default ResultDisplay;