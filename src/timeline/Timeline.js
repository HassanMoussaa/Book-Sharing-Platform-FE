import React, { useState, useEffect } from 'react';
import "./Timeline.css"
import Sugesstions from './Sugesstions'
import Post from './posts/Post'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Timeline() {

const [posts, setPosts] = useState([]);
const jwtToken = Cookies.get('jwt_token');


 const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/posts/following', {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setPosts(response.data.posts);
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
          <Post key={post.id} post={post} /> 
        ))}
      </div>
      <div className='timeline__right'>
        <Sugesstions />
      </div>
    </div>
  );
}

export default Timeline
