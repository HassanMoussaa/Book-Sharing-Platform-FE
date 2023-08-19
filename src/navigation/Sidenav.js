import React, { useState, useEffect } from "react";
import "./Sidenav.css"
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "./Modal"
import SearchModal from "./SearchModal";

function Sidenav() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };



  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };
    
  return (
    <div className='sidenav'>
    <img
        className="sidenav__logo"
        src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
        alt="Instagram Logo"
      />

     <div className='sidenav__buttons'>
        <button className='sidenav__button' onClick={() => window.location.reload()}>
            <HomeIcon />
            <span>Home</span>    
        </button>


       <button className="sidenav__button" onClick={openSearchModal}>
        <SearchIcon />
        <span>Search</span>
      </button>

         <button className='sidenav__button'>
            <ExploreIcon />
            <span>Explore</span>    
        </button>

         <button className='sidenav__button'>
            <SlideshowIcon />
            <span>Reels</span>    
        </button>


          <button className='sidenav__button'>
            <ChatIcon />
            <span>Messages</span>    
        </button>

         <button className='sidenav__button'>
            <FavoriteBorderIcon />
            <span>Notifications</span>    
        </button>

        < button className='sidenav__button' onClick={handleCreateClick}>
            <AddCircleOutlineIcon />
            <span>Create</span>    
        </button>

         {/* for modal work */}
          {isModalOpen && <Modal onClose={handleModalClose} />}
         
          {/* Search Modal */}
          {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}


      </div> 

          <div className='sidenav__more'>
           <button className='sidenav__button'>
             <MenuIcon />
             <span>More</span>
           </button>
          </div>
    </div>
  )
}

export default Sidenav
