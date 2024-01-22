import React from 'react';

interface StarRatingProps {
  score: number;
}

const StarRating: React.FC<StarRatingProps> = ({ score }) => {
  // Menentukan jumlah bintang berdasarkan aturan yang Anda berikan
  const getStarCount = () => {
    if (score >= 0 && score <= 50) {
      return 1;
    } else if (score > 50 && score <= 100) {
      return 2;
    } else if (score > 100 && score <= 150) {
      return 3;
    } else if (score > 150 && score <= 200) {
      return 4;
    } else {
      return 5;
    }
  };

  const filledStars = getStarCount();

  return (
    <div className="star-rating">
      {Array.from({ length: filledStars }).map((_, index) => (
        <span key={index} className="filled">
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

