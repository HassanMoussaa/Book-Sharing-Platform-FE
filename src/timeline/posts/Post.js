import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./Post.css";
import axios from 'axios'; 
import Cookies from "js-cookie";

function Post({ post }) {
  const [isLiked, setIsLiked] = useState(!post.is_liked);  
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    checkIsLiked();
  }, []);

  const checkIsLiked = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/posts/liked/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setIsLiked(response.data.liked);
    } catch (error) {
      console.error("Error checking if post is liked:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        
        await axios.post(
          `http://127.0.0.1:8000/api/posts/unlike/${post.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      } else {
       
        await axios.post(
          `http://127.0.0.1:8000/api/posts/like/${post.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      }
      setIsLiked(!isLiked);  
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };
  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__headerAuthor'>
            <Avatar alt={post.user.name} src={post.user.image} />
          {post.user.username} . <span>{new Date(post.created_at).toLocaleTimeString()}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className='post__image'>
        <img src={post.image_url} alt='post' />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain">
              {isLiked ? (
                  <FavoriteBorderIcon className="postIcon postIconLiked" onClick={handleLikeClick} />
                ) : (
                  <FavoriteBorderIcon className="postIcon" onClick={handleLikeClick} />
                )}
            <ChatBubbleOutlineIcon className="postIcon" />
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        Liked by {post.likes_count} people.
      </div>
    </div>
  );
}

export default Post
