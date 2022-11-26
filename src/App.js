import logo from './logo.svg';
import './App.css';
import Navigation from "./components/navigation";
import Login from "./components/login";
import Search from "./components/search";
import BookDetails from "./components/bookdetails";
import UserDetails from './components/userdetails';
import CreateShelf from "./components/createShelf";
import SignUp from "./components/signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Navigation />
      <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/search" element={ <Search /> } />
          <Route path="/search/book_details/:book_id" element={ <BookDetails />} />
          <Route path="/user/:user_id/profile" element={ <UserDetails /> } />
          <Route path="/user/:user_id/createshelf" element={ <CreateShelf />} />

      </Routes>
    </Router>
  );
}

export default App;
