import React, { useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import '../App.css';
import ResultDisplay from './resultcomp';

function Search({user}) {
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
        <div>
          <h2>Search</h2>
          <form id="search" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="user_search_input">Please input your search.</label>
                <input 
                  type="text" 
                  name="search_input" 
                  id="user_search_input"
                  value={searchInput}
                  onChange={updateInput}
                />
              <label htmlFor="search_criteria">Search Criteria</label>
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
              <input type="submit" />
            </div>
          </form>
        </div>
        <div>
          <ResultDisplay results={results} user={user} />
        </div>
      </section>
    </React.Fragment>
  );
}

export default Search;