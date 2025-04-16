// src/components/LazyImage.js
import React, { useState } from 'react';

const LazyImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    return (
        <img
            src={isLoaded ? src : ""}
            alt={alt}
            className={className}
            loading="lazy"
            onLoad={handleImageLoad}
            style={{
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease",
            }}
        />
    );
};

export default LazyImage;
