import React, { useState, useEffect } from 'react';
import "./Timeline.css"
import Sugesstions from './Sugesstions'
import Post from './posts/Post'
import axios from "axios";


function Timeline() {
  const [posts, setPosts] = useState([]);
  const jwtToken = localStorage.getItem("jwt_token");

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books/feed', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setPosts(response.data); 
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='timeline'>
      <div className='timeline__left'>
        {posts.map(post => (
          <Post key={post._id} post={post} /> 
        ))}
      </div>
      <div className='timeline__right'>
        <Sugesstions />
      </div>
    </div>
  );
}

export default Timeline;
