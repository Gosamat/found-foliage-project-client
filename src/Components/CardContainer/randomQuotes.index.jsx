import React, { useState, useEffect } from 'react';

function RandomQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const quotes = [
    {
      quote: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
      author: " - Robert Louis Stevenson"
    },
    {
      quote: "I'm really quite simple. I plant flowers and watch them grow... I stay at home and watch the river flow.",
      author: " - George Harrison"
    },
    {
      quote: "If you think in terms of a year, plant a seed; if in terms of ten years, plant trees; if in terms of 100 years, teach the people",
      author: " - Confucius"
    },
    {
      quote: "He who plants kindness gathers love",
      author: " - Saint Basil"
    },
  ];

  // Set the initial quote and author immediately when the component is mounted
  const initialIndex = Math.floor(Math.random() * quotes.length);
  const initialQuote = quotes[initialIndex];
  useEffect(() => {
    setQuote(initialQuote.quote);
    setAuthor(initialQuote.author);

    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="random-quote relative flex flex-col w-56">  
      <p className="quote z-100" style={{ fontStyle: 'italic' }}>"{quote}"</p>
      <p className="author z-100"style={{ fontWeight: 'bold' }}>{author}</p>
      <div className='absolute top-0 bottom-5 left-0 right-0 z-1' ><img className='bg-cover h-full w-full ' src="https://i.ibb.co/xGtgW0Z/splash-2.png" /></div> 
    </div>    
    
  );
}

export default RandomQuote;
