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

    const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    const searchApi = `${apiUrl}${searchCriteria}${searchInput}`;

    const searchData = {};
    if (searchInput === "") {
      alert("Please enter text into the search field.")
    } else {
      fetch(`${searchApi}`)
          .then((response) => response.json() )
          .then((searchData) => setResults(searchData.items));
  }};

  // const renderResults = results => {
  //   results.map(result => {
  //     if (typeof result.volumeInfo.imageLinks === 'undefined'){
  //       <ul key={result.id}>
  //         <li>No Thumbnail Provided</li>
  //         <li>Title: {result.volumeInfo.title}</li>
  //         <li>Author: {result.volumeInfo.authors[0]}</li>
  //         <li>Published Date: {result.volumeInfo.publishedDate}</li>
  //       </ul>
  //     } else {
  //       <ul key={result.id}>
  //         <li><img src={result.volumeInfo.imageLinks.thumbnail} /></li>
  //         <li>Title: {result.volumeInfo.title}</li>
  //         <li>Author: {result.volumeInfo.authors[0]}</li>
  //         <li>Published Date: {result.volumeInfo.publishedDate}</li>
  //       </ul>
  //     }})
  // };

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
          {results.map(result => {
            if (result.volumeInfo.imageLinks.thumbnail === 'undefined'){
              <ul key={result.id}>
                <li>No Thumbnail Provided</li>
                <li>Title: {result.volumeInfo.title}</li>
                <li>Author: {result.volumeInfo.authors[0]}</li>
                <li>Published Date: {result.volumeInfo.publishedDate}</li>
              </ul>
            } else {
              <ul key={result.id}>
                <li><img src={result.volumeInfo.imageLinks.thumbnail} /></li>
                <li>Title: {result.volumeInfo.title}</li>
                <li>Author: {result.volumeInfo.authors[0]}</li>
                <li>Published Date: {result.volumeInfo.publishedDate}</li>
              </ul> }})}
      </div>
    </section>
  );
}

// const GoogleBooksSearch = (searchInput, searchCriteria) => {
//     ///Makes fetch request to Google Books Api.///

//     const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
//     const searchApi = `${apiUrl}${searchCriteria}${searchInput}`;

//     const searchData = {};

//     fetch(`${searchApi}`)
//         .then((response) => response.json() )
//         .then((searchData) => setResults(searchData));

//     return results
// };

export default Search;
