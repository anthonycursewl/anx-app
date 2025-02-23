// @ts-nocheck
import { useEffect, useState } from "react";
import './SliderImages.css'

interface SliderImagesProps {
    images: string[]
}

export default function SliderImages({ images }: SliderImagesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex: number) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000); 
    return () => clearInterval(interval); 
  }, [currentIndex]);


  return (
    <div className="carrusel">
      <button className="nav-button prev" onClick={goToPrevious}>
        &#10094;
      </button>

      <div className="carrusel-container">
        {images.map((image, index) => (
          <img
            key={index}
            className={`slide active`}
            src={images[currentIndex]}
          />
        ))}
      </div>

      <button className="nav-button next" onClick={goToNext}>
        &#10095;
      </button>

      <div className="carrusel-dots">
        {
            images.map((image, index) => (
                <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => setCurrentIndex(index)}>#</span>
            ))
        }
      </div>

    </div>
  );
}


  

  
