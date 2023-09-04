import React, { useState } from 'react';

const images = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpg',
];

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide} className="carousel-button prev-button">
        Previous
      </button>
      <img
        src={images[activeIndex]}
        alt={`Image ${activeIndex + 1}`}
        className="carousel-image"
      />
      <button onClick={nextSlide} className="carousel-button next-button">
        Next
      </button>
    </div>
  );
}

export default Carousel;