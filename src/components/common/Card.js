import React from "react";

// Card component for consistent styling
const Card = ({ children, className = "", onMouseEnter, onMouseLeave }) => (
    <div
        className={`bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-cyan-500/20 transition-all duration-300 hover:shadow-lg hover:border-cyan-500/40 ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {children}
    </div>
);

export default Card;
