import React, { useEffect, useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

function HomePageScroll() {
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
      <div className={`homepagetop ${scrolled ? 'scroll-active' : ''}`}>
        <h1>Found</h1>
        <h1>Foliage</h1>
      </div>

      <div className="nav-links">
        <Link
          to="about-section"
          smooth={true}
          duration={500}
          className="scroll-link"
        >
          About Us
        </Link>
        <Link
          to="services-section"
          smooth={true}
          duration={500}
          className="scroll-link"
        >
          Services
        </Link>
      </div>

      <section id="about-section" className={`section ${scrolled ? 'scroll-active' : ''}`}>
        <h2>About Us</h2>
        <p>Your text here...</p>
      </section>

      <section id="services-section" className={`section ${scrolled ? 'scroll-active' : ''}`}>
        <h2>Services</h2>
        <p>Your text here...</p>
      </section>
    </section>
  );
}

export default HomePageScroll;