import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RandomQuote from './randomQuotes.index';
import { AuthContext } from "../../Context/Auth.Context";

const boxShadowStyle = {
  boxShadow: '10px 10px 0px rgba(0, 0, 0, 0.05)',
};

function makeText() {
  const textOptions = [
    'Discover the magic of plant recognition through the lens of your camera.',
    'Portal to the World of Plant Identification',
  ];

  const randomIndex = Math.floor(Math.random() * textOptions.length);
  return textOptions[randomIndex];
}

const API_URL = "https://found-foliage-server.onrender.com";

const Card = () => {
  const initialText = localStorage.getItem('cardText') || makeText();
  const [cardText, setCardText] = useState(initialText);
  const [plantCollection, setPlantCollection] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_URL}/plant`)
      .then((response) => {
        setPlantCollection(response.data);
      })
      .catch((error) =>
        console.log(
          "error while grabbing plants in user's garden from API: ",
          error
        )
      );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % plantCollection.length);
      setCardText(makeText());
      setTimeout(() => {
        setCardText(makeText());
      }, 5000);

      localStorage.setItem('cardText', cardText);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [cardText, plantCollection]);

  const cardData = {
    cardTitle: "Nature's Enigma",
  };

  return (
    
    <div className="card-container">
  <div className="card" key={plantCollection._id}>
    {/* Existing card content */}
    <div className="card__thumb" style={boxShadowStyle}>
      {plantCollection.length > 0 && (
        <div className="card__thumb" style={boxShadowStyle}>
          <img className='rounded-xl h-full w-full bg-cover bg-center'
            src={plantCollection[currentImageIndex].imgUrl}
            alt={plantCollection[currentImageIndex].name}
          />
        </div>
      )}
    </div>
    <div className="card__content" style={boxShadowStyle}>
      <h3 className="card__title">{cardData.cardTitle}</h3>
      <p className={`card__text ${cardText !== initialText ? 'fade' : ''}`}>
        {cardText}
      </p>
      <a
        className="card__btn"
        aria-label={`Read more about ${cardData.cardTitle}`}
        href="#"
      >
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/4147/4147953.png"
          alt=""
        /> */}
      </a>
    </div>
  </div>

  {/* New text section */}
  
  <div className="card flex items-center justify-center h-100">
  <div className="quote-container flex items-center justify-center h-56 w-h-90">
      <RandomQuote></RandomQuote>
    </div>
  </div>
</div>
    
  );
};

export default Card;
