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
    if (!searchQuery) return; 
   try {
     const formData = new FormData();
     formData.append("query", searchQuery);

     const response = await axios.post(
      "http://127.0.0.1:8000/api/search/users",
      formData,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
      if (response) {
        const users = response.data.users;
        navigate("/SearchResults", { state: { users } });
        
      }
    } catch (error) {
      console.error("Error searching for users:", error);
    }
    onClose();
  };
  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <input
          type="text"
          placeholder="Search users..."
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