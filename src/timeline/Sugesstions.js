import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import './Sugesstions.css'

function Suggestions() {
  const [allUsers, setAllUsers] = useState([]);
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    fetchAllUsers();
    
    const updatedUsers = allUsers.map(user => {
      const followStatus = localStorage.getItem(`followStatus_${user.id}`);
      if (followStatus === 'followed') {
        return { ...user, is_followed: true };
      } else if (followStatus === 'unfollowed') {
        return { ...user, is_followed: false };
      }
      return user;
    });
    setAllUsers(updatedUsers);
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setAllUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/user/follow/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    
      localStorage.setItem(`followStatus_${userId}`, 'followed');
    
      setAllUsers(allUsers.map(user => user.id === userId ? { ...user, is_followed: true } : user));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/user/unfollow/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
   
      localStorage.setItem(`followStatus_${userId}`, 'unfollowed');
     
      setAllUsers(allUsers.map(user => user.id === userId ? { ...user, is_followed: false } : user));
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div className="suggestions">
      <div className="suggestions__title">Suggestions for you</div>
      <div className="suggestions__usernames">
        {allUsers.map(user => (
          <div key={user.id} className="suggestions__username">
            <div className="username__left">
              <span className="avatar">
                 <Avatar alt={user.name} src={user.image} />
              </span>
              <div className="username__info">
                <span className="username">{user.username}</span>
                <span className="relation">New to Instagram</span>
              </div>
            </div>
            {user.is_followed ? (
              <button className="follow__button" onClick={() => handleUnfollow(user.id)}>
                Unfollow
              </button>
            ) : (
              <button className="follow__button" onClick={() => handleFollow(user.id)}>
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
