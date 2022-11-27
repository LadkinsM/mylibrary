import React from 'react';
import { Link } from 'react-router-dom';


const ResultDisplay = (props) => {
    const results = props.results

    return(
        <React.Fragment>
            <h2>Results</h2>
                <div className="container">
                {results && results.map(result => {
                    return <Link to={`book_details/${result.book_id}`}>
                                <div className="card">
                                <ul key={result.book_id}>
                                    {result.cover ? <img src={result.cover} />:<p>Image Not Available</p>}
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