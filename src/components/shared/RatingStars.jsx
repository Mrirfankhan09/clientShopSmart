import React from "react";
import { Star } from "lucide-react";

const RatingStars = ({ rating = 0, outOf = 5 }) => {
  return (
    <div className="flex items-center">
      {[...Array(outOf)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill={i < Math.round(rating) ? "#facc15" : "none"}
        />
      ))}
    </div>
  );
};

export default RatingStars;