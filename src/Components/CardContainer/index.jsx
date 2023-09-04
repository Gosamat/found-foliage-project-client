import React, { useState, useEffect } from 'react';
const boxShadowStyle = {
    boxShadow: '10px 10px 0px rgba(0, 0, 0, 0.05)',
  };
// Function to generate random text
function makeText() {
  const textOptions = [
    'Discover the magic of plant recognition through the lens of your camera.',
    'Portal to the World of Plant Identification',
  ];

  const randomIndex = Math.floor(Math.random() * textOptions.length);
  return textOptions[randomIndex];
  
}

const Card = () => {
  // Retrieve text from localStorage or use a random text if not present
  const initialText = localStorage.getItem('cardText') || makeText();
  const [cardText, setCardText] = useState(initialText);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Toggle the fade class after 10 seconds
      setCardText(makeText());
      setTimeout(() => {
        setCardText(makeText());
      }, 5000); // Delay for 5 seconds before fading in the new text

      // Store the new text in localStorage
      localStorage.setItem('cardText', cardText);
    }, 10000); // Change text every 20 seconds (10 seconds for each text)

    return () => clearInterval(intervalId);
  }, [cardText]);

  const cardData = {
    imageSrc:
      'https://raw.githubusercontent.com/Javieer57/CODEPEN-gnarly-grid-cards/main/assets/img-1.png',
    cardTitle: "Nature's Enigma",
  };

  return (
    <li className="card" >
      <div className="card__thumb" style={boxShadowStyle}>
        <img
          className="animate"
          src={cardData.imageSrc}
          alt={`Card for ${cardData.cardTitle}`}
        />
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/4147/4147953.png"
            alt=""
          />
        </a>
      </div>
    </li>
  );
};

const CardContainer = () => {
  return (
    <div>
      <ul className="cards__container">
        {/* Render the Card component */}
        <Card />
        <div className='text-container'>
        <h1> Portal to the World of 
          </h1>
          <h1>Plant Identification</h1> 
        </div>
      </ul>
    </div>
  );
};

export default CardContainer;
