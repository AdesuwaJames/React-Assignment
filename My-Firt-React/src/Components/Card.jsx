import React, { useEffect, useState } from "react";
import PhHeartFill from "../assets/PhHeartFill.svg";
import PhHeartLight from "../assets/PhHeartLight.svg";
import "./card.css";

const Card = ({ index, card, liked, toggleLike, setPreview }) => {
  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedCards")) || {};
    setIsLiked(storedLikes[card.id] || false);
  }, [card.id]);

  const handleLike = (e) => {
    e.stopPropagation();
    const updatedLikes = JSON.parse(localStorage.getItem("likedCards")) || {};
    updatedLikes[card.id] = !isLiked;
    localStorage.setItem("likedCards", JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
    toggleLike(index);
  };

  return (
    <div className="card" onClick={() => setPreview(card)}>
      <img src={card.imgSrc} alt={card.name} className="card-img" />
      <div className="card__content">
        <h4>{card.name}</h4>
        <button onClick={handleLike} className="btn-like">
          <img
            src={isLiked ? PhHeartFill : PhHeartLight}
            alt="like icon"
            className="like-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
