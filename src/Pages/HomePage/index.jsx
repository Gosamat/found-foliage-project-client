import React, { useEffect, useState } from 'react';
import Carousel from '../../Components/CardContainer';
import{ Card, CardFooter, } from "@nextui-org/react";
import CardContainer from '../../Components/CardContainer';


function HomePage() {
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section>
    <div className='homepagebox'> 
      <div className={`homepagetop ${scrolled ? 'scroll-active' : ''}`}>
        <div className="background-overlay"></div> {/* Add this overlay */}
        <h1>Found</h1>
        <h1>Foliage</h1>
      </div>
      </div>

      <CardContainer>


      </CardContainer>  
 
 
 
 
 
 
  <section className='process'>
    <h2>The Process</h2>
    <div className="process-section">
      <div className="process-step">
        <img src="https://img.icons8.com/?size=512&id=113801&format=png" alt="Upload" />
        <h3>Upload</h3>
        <p>Choose and upload your picture.</p>
      </div>
      <div className="process-step">
        <img src="https://img.icons8.com/?size=512&id=2v9II0Gxz9Js&format=png" alt="Wait" />
        <h3>Wait</h3>
        <p>Our system processes your image.</p>
      </div>
      <div className="process-step">
        <img src="https://img.icons8.com/?size=512&id=112163&format=png" alt="Result" />
        <h3>Get Plant Identification</h3>
        <p>View the result.</p>
      </div>
    </div>
  </section>


     
    </section>
  );
}

export default HomePage;