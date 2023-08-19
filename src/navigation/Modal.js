import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Modal.css";

function Modal({ onClose }) {
  const [imageFile, setImageFile] = useState(null);
  const jwtToken = Cookies.get("jwt_token");

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };


 const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    

    axios
      .post("http://127.0.0.1:8000/api/posts/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        
         setIsUploaded(true);

        setTimeout(() => {
          setIsUploaded(false);
          onClose();
        }, 3000);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload}>Upload</button>
        <button onClick={onClose}>Close</button>
          {isUploaded && <p className="success-message">Post uploaded successfully!</p>}
      </div>
    </div>
  );
}

export default Modal;
