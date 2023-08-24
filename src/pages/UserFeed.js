import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchResults.css"; 

function UserFeed() {
  const navigate = useNavigate();

  const [userPosts, setUserPosts] = useState([]);
  const jwtToken = localStorage.getItem("jwt_token");

  const handleBack = () => {
    navigate("/Homepage");
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/books/postsuser", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUserPosts(response.data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <div className="user-feed-container">
      <button className="back-button" onClick={handleBack}>
        Back to Homepage
      </button>
      <h1>User Posts</h1>
      <ul className="search-results-list">
        {userPosts.map((post) => (
          <li key={post._id} className="book-card">
            <img
              className="book-image"
              src={post.picture ? post.picture : "default-image-url"}
              alt={post.title}
            />
            <div className="book-details">
              <h4 className="book-title">Title: {post.title}</h4>
              <p className="book-author">
                <b>Author:</b> {post.author}
              </p>
              <p className="book-review">
                <b>Review:</b> {post.review}
              </p>
              <p className="posted-by">
                <b>Posted by:</b> {post.posted_by.first_name} {post.posted_by.last_name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserFeed;
