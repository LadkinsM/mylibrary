import React from 'react';
import { Link } from 'react-router-dom';
import NoImageProvided from '../images/NoImageProvided.png';


const ResultDisplay = (props) => {
    //Display results from search input.

    const results = props.results

    return(
        <React.Fragment>
                <div className="container">
                {results && results.map(result => {
                    return <Link to={`book_details/${result.book_id}`}>
                                <div className="card">
                                <ul key={result.book_id}>
                                    {result.cover !== "Not Provided" ? <img src={result.cover} /> : 
                                                                    <img src={NoImageProvided} /> }
                                    <li>Title: {result.title}</li>
                                    <li>Author: {result.authors}</li>
                                    <li>Published Date: {result.publish_date}</li>
                                </ul>
                                </div>
                            </Link>
                })}
                </div>
        </React.Fragment>
    )
}

export default ResultDisplay;