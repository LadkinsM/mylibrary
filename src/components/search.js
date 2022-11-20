import React from 'react';
import '../App.css';

function Search() {
  const[searchInput, setSearchInput] = React.useState("");
  const[searchCriteria, setSearchCriteria] = React.useState("");
  const[results, setResults] = React.useState([]);

  const updateInput = evt => {
    setSearchInput(evt.target.value);
  };

  const updateCriteria = evt => {
    console.log(evt.target.value);
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
          console.log(results)});
  }
};


  return (
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
              <option value="">All Results</option>
              <option value="+intitle:">Title</option>
              <option value="+inauthor:">Author</option>
              <option value="+subject:">Genre</option>
            </select>
            <input type="submit" />
          </div>
        </form>
      </div>
      <div>
        <h2>Results</h2>
          {results && results.map(result => {
              return <ul key={result.book_id}>
                      {result.cover ? <li><img src={result.cover} /></li>:<p>Image Not Available</p>};
                      <li>Title: {result.title}</li>
                      <li>Author: {result.authors}</li>
                      <li>Published Date: {result.publish_date}</li>
                    </ul>
          })};
      </div>
    </section>
  );
}

export default Search;