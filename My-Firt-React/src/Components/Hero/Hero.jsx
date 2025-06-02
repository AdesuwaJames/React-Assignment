import React, { useState } from "react";
import "./hero.css";
import avatar from "../../assets/Avatar.png";
import editProfile from "../../assets/Group 2.svg";
import newPost from "../../assets/Group 26.svg";
const Hero = ({ showModal, profile, setNewPostModal  }) => {
  
  return (
    <main className="main_hero" aria-label="Hero Section">
      <div className="hero">
        <div className="hero__left" aria-label="Hero Left Section">
          <img
            src={profile.image || avatar }
            alt="Profile picture of person"
            className="hero__img"
            id="currentProfileImg"
          />
          <div className="hero__profile" aria-label="Hero Profile Section">
            <section className="hero__profile--top">
              <h2 className="hero__name" id="currentName">
                {profile.name}
              </h2>
              <h3 className="hero__bio" id="currentBio">
                Civil Aviator
              </h3>
            </section>
            <button
              className="hero__edit"
              id="editProfileBtn"
              aria-label="Edit Profile Button"
              onClick={showModal} 
            >
              <img src={editProfile} alt="Edit Profile Icon" />
              Edit Profile
            </button>
          </div>
        </div>
        <button className="new_post" aria-label="New Post Button"  onClick={() => setNewPostModal(true)}>
          <img
            src={newPost}
            alt="New Post Icon"
            style={{ backgroundColor: "black", marginRight: 10 }}
          />
          New Post
        </button>
      </div>

      <hr />
    </main>
  );
};

export default Hero;
