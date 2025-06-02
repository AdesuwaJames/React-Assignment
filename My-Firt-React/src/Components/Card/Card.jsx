import React, { useEffect, useState } from 'react';
import PhHeartFill from '../../assets/PhHeartFill.svg';
import PhHeartLight from '../../assets/PhHeartLight.svg';
import './card.css';

const Card = ({ index, card, liked, toggleLike, setPreview }) => {
  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedCards')) || {};
    setIsLiked(storedLikes[card.id] || false);
  }, [card.id]);

  const handleLike = (e) => {
    e.stopPropagation();
    const updatedLikes = JSON.parse(localStorage.getItem('likedCards')) || {};
    updatedLikes[card.id] = !isLiked;
    localStorage.setItem('likedCards', JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
    toggleLike(index);
  };

  return (
    <div className="card" onClick={() => setPreview(card)} style={{
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      cursor: 'pointer'
    }}>
      <img 
        src={card.imgSrc} 
        alt={card.name} 
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          display: 'block'
        }} 
      />
      <div style={{
       
        color: 'white',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h4 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: 'normal',
          maxWidth: 'calc(100% - 40px)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color:'black'
        }}>{card.name}</h4>
        <button 
          onClick={handleLike}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0'
          }}
        >
          <img
            src={isLiked ? PhHeartFill : PhHeartLight}
            alt="like icon"
            style={{
              width: '24px',
              height: '24px',
              background:'none'
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;