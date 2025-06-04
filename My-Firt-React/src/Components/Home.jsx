import React, { useState, useEffect } from "react";
import Header from "./Header";
import Card from "./Card";
import "./home.css";
import avatar from "../assets/Avatar.png";
import editProfile from "../assets/Group 2.svg";
import newPost from "../assets/Group 26.svg";
import valThorens from "../assets/val-thorens.svg";
import restaurantTerrace from "../assets/restaurant-terrace.svg";
import outdoorCafe from "../assets/an-outdoor-cafe.svg";
import bridgeForest from "../assets/mask-group-3.png";
import morningTunnel from "../assets/mask-group-4.png";
import mountainHouse from "../assets/mask-group-6.png";

export const defaultCards = [
  {
    id: 1,
    name: "Val Thorens",
    imgSrc: valThorens,
    liked: false,
  },
  {
    id: 2,
    name: "Restaurant terrace",
    imgSrc: restaurantTerrace,
    liked: false,
  },
  {
    id: 3,
    name: "An outdoor cafe",
    imgSrc: outdoorCafe,
    liked: false,
  },
  {
    id: 4,
    name: "A very long bridge, over the forest...",
    imgSrc: bridgeForest,
    liked: false,
  },
  {
    id: 5,
    name: "Tunnel with morning light",
    imgSrc: morningTunnel,
    liked: false,
  },
  {
    id: 6,
    name: "Mountain house",
    imgSrc: mountainHouse,
    liked: false,
  },
];

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const Home = () => {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [profile, setProfile] = useState({
    name: "Bessie Coleman",
    image: null,
  });
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ title: "", image: "" });
  const [errors, setErrors] = useState({});
  const [newPostModal, setNewPostModal] = useState(false);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (profile.name.length < 2) return;
    setEditProfileModal(false);
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  useEffect(() => {
    try {
      const storedCards = JSON.parse(localStorage.getItem("cards"));
      if (storedCards && storedCards.length) {
        setCards(storedCards);
      } else {
        setCards(defaultCards);
        localStorage.setItem("cards", JSON.stringify(defaultCards));
      }

      const storedProfile = JSON.parse(localStorage.getItem("profile"));
      if (storedProfile) setProfile(storedProfile);
    } catch (err) {
      console.error("Failed to load from localStorage", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const toggleLike = (index) => {
    setLikedCards((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (form.title.length < 2)
      newErrors.title = "Minimum 2 characters required";
    if (!form.image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCard = {
      id: Date.now(),
      name: form.title,
      imgSrc: form.image,
      liked: false,
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setForm({ title: "", image: "" });
    setNewPostModal(false);
    setErrors({});
  };

  return (
    <div>
      <Header />
      <div className="home">
        <div className="home__container" aria-label="Home Container">
          <main className="main_hero" aria-label="Hero Section">
            <div className="hero">
              <div className="hero__left" aria-label="Hero Left Section">
                <img
                  src={profile.image || avatar}
                  alt="Profile picture of person"
                  className="hero__img"
                  id="currentProfileImg"
                />
                <div
                  className="hero__profile"
                  aria-label="Hero Profile Section">
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
                    onClick={() => setEditProfileModal(true)}>
                    <img src={editProfile} alt="Edit Profile Icon" />
                    Edit Profile
                  </button>
                </div>
              </div>
              <button
                className="new_post"
                aria-label="New Post Button"
                onClick={() => setNewPostModal(true)}>
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

          <div className="card-container">
            {cards.map((card, i) => (
              <Card
                key={card.id}
                index={i}
                card={card}
                liked={likedCards.includes(i)}
                toggleLike={toggleLike}
                setPreview={setPreview}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rest of your modal code remains the same */}
      {newPostModal && (
        <div className="modal">
          <form onSubmit={handleNewPostSubmit} className="modal-content">
            <h2>New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              minLength={2}
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <span className="error">{errors.title}</span>}

            <input
              type="file"
              accept="image/*"
              required
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await fileToBase64(file);
                  setForm({ ...form, image: base64 });
                }
              }}
            />
            {errors.image && <span className="error">{errors.image}</span>}

            <button type="submit">Create</button>
            <button type="button" onClick={() => setNewPostModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {preview && (
        <div className="modal" onClick={() => setPreview(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={preview.imgSrc}
              alt={preview.name}
              className="preview-image"
            />
            <h3>{preview.name}</h3>
            <button onClick={() => setPreview(null)}>Close</button>
          </div>
        </div>
      )}

      {editProfileModal && (
        <div className="modal">
          <form onSubmit={handleProfileSubmit} className="modal_content">
            <h2>Edit Profile</h2>
            <input
              type="text"
              value={profile.name}
              minLength={2}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await fileToBase64(file);
                  setProfile((prev) => ({ ...prev, image: base64 }));
                }
              }}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditProfileModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <footer aria-label="Site Footer" className="footer">
        <p>2024 © Spots</p>
      </footer>
    </div>
  );
};

export default Home;
