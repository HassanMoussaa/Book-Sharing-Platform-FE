import React, { useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function SearchModal({ onClose, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  const handleSearch = async () => {
    // if (!searchQuery) return;

   try {
    const params = searchQuery ? { keywords: searchQuery } : {};
    
    const response = await axios.get("http://localhost:8000/books/search", {
      params,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

      if (response) {
        const searchResults = response.data; 
        navigate("/SearchResults", { state: { searchResults } });
      }
    } catch (error) {
      console.error("Error searching for books:", error);
    }

    onClose();
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SearchModal;
