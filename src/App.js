import logo from './logo.svg';
import './App.css';
import Navigation from "./components/navigation";
import Login from "./components/login";
import Search from "./components/search";
import BookDetails from "./components/bookdetails";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/search" element={ <Search /> } />
          {/* <Route path="/book/" element={ <BookDetails book={book} />} */}

      </Routes>
    </Router>
  );
}

export default App;
