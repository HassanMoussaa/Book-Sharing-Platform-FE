import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

function SearchResults() {
  const location = useLocation();
  const searchResults = location.state.searchResults; 
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/Homepage");
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>
        Back to Homepage
      </button>
      <h1>Search Results</h1>
      <ul className="search-results-list">
        {searchResults.map((book) => ( 
          <li key={book._id} className="book-card">
            <img
              className="book-image"
              src={book.picture ? book.picture : "default-image-url"}
              alt={book.title}
            />
            <div className="book-details">
              <h4 className="book-title">Title: {book.title}</h4>
              <p className="book-author"> <b>Auther:</b> {book.author}</p>
              <p className="book-review"> <b>Review:</b> {book.review}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
