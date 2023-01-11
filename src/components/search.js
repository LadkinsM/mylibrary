import React from 'react';
import '../App.css';
import ResultDisplay from './resultcomp';
import { Col, Container, Row } from 'react-bootstrap';

function Search({user}) {
  //Search Component, submits request to api and directs results to result component.
  
  const[searchInput, setSearchInput] = React.useState("");
  const[searchCriteria, setSearchCriteria] = React.useState("+all:");
  const[results, setResults] = React.useState([]);

  const updateInput = evt => {
    setSearchInput(evt.target.value);
  };

  const updateCriteria = evt => {
    setSearchCriteria(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault()

    if (searchInput === "") {
      alert("Please enter text into the search field.")
    } else {
      fetch(`/api/${searchInput}/${searchCriteria}`)
          .then((response) => response.json())
          .then((searchData) => {setResults(searchData);
          });
  }
};

  return (
    <React.Fragment>
      <section id="search_results">
        <Container className='search-container'>
          <Row>
            <h1 className='search-header'>Search</h1>
          </Row>
            <form id="search" onSubmit={handleSubmit}>
              <Row className="search-row">
                <Col md={{ span: 6, offset: 0 }} className='search-selects'>
                    <input 
                      type="text" 
                      name="search_input" 
                      id="user_search_input"
                      value={searchInput}
                      onChange={updateInput}
                    />
                  <select 
                    id="search_criteria" 
                    value={searchCriteria} 
                    onChange={updateCriteria}
                  >
                    <option value="+all:">All Results</option>
                    <option value="+intitle:">Title</option>
                    <option value="+inauthor:">Author</option>
                    <option value="+subject:">Genre</option>
                  </select>
                  <input type="submit" id="search_submit"/>
                </Col>
              </Row>
            </form>
        </Container>
        <Container>
          <ResultDisplay results={results} user={user} />
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Search;