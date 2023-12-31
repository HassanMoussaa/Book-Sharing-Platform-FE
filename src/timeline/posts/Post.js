import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import "./Post.css";
import axios from 'axios'; 

function Post({ post }) {
  const [isLiked, setIsLiked] = useState(!post.is_liked); 
  const [isCommenting, setIsCommenting] = useState(false); 
  const [commentsVisible, setCommentsVisible] = useState(false); 
   const [newComment, setNewComment] = useState('');
  const [updatedPost, setUpdatedPost] = useState(post);

  const jwtToken = localStorage.getItem("jwt_token");

  useEffect(() => {
    checkIsLiked();
  }, []);

  const checkIsLiked = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/books/${post._id}/isliked`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error("Error checking if post is liked:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        
        await axios.post(
          `http://localhost:8000/books/${post._id}/unlike`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
      } else {
       
        await axios.post(
          `http://localhost:8000/books/${post._id}/like`,
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


   const handleCommentClick = () => {
    setIsCommenting(true);
  };

  const handleViewCommentsClick = () => {
    setCommentsVisible(!commentsVisible);
    
  };

  const handleCloseCommentPopup = () => {
    setIsCommenting(false);
    setNewComment('');
  };
  
const handleCommentSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:8000/books/addComment/${post._id}`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const newCommentData = {
      author: `${post.posted_by.first_name} ${post.posted_by.last_name}`,
      content: newComment,  
         };
      setNewComment('');
      setIsCommenting(false); 
      setCommentsVisible(true); 
      
      setUpdatedPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, newCommentData],
    }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };


  
  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__headerAuthor'>
            <Avatar alt={post.posted_by.first_name+post.posted_by.last_name} src={post.posted_by.image} />
          {post.posted_by.first_name+" "+post.posted_by.last_name}  
          {/* <span>{new Date(post.created_at).toLocaleTimeString()}</span> */}
        </div>
        <MoreHorizIcon />
      </div>
      <div className='post__image'>
        <img src={post.picture} alt='post' />
      </div>
      <div className="post__footer">
        <div className="post__footerIcons">
          <div className="post__iconsMain">
              {isLiked ? (
                  <FavoriteBorderIcon className="postIcon postIconLiked" onClick={handleLikeClick} />
                ) : (
                  <FavoriteBorderIcon className="postIcon" onClick={handleLikeClick} />
                )}
            <ChatBubbleOutlineIcon className="postIcon" onClick={handleCommentClick} />
            <TelegramIcon className="postIcon" />
          </div>
          <div className="post__iconSave">
            <BookmarkBorderIcon className="postIcon" />
          </div>
        </div>
        <div className="post__details">
          <p className="post__author"> <b>Auther: </b> {post.author}</p>
          <p className="post__review"><b>Review: </b>{post.review}</p>
        </div>
        Liked by {post.liked_by.length} people.
       </div>

      <div className="post__comments">
          <button onClick={handleViewCommentsClick}>
            {commentsVisible ? "Hide Comments" : "View Comments..."}
          </button>
          {commentsVisible && (
            <div className="commentList">
              {updatedPost.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <p>{comment.author}</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

       
      {isCommenting  && (
        
          <>
          <div className="overlay" onClick={handleCloseCommentPopup} />
          <div className="commentPopup">
            <textarea
              placeholder="Add your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Add Comment</button>
            <button onClick={handleCloseCommentPopup}>Cancel</button>
          </div>
        </>
      )}


      </div>
  );
}

export default Post;
