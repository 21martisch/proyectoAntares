// Card.js
import React from 'react';
import '../../App.css';

const Card = ({ title, content }) => {
    return (
        <div className="card">
        <h4>{title}</h4>
        <p>{content}</p>
        </div>
    );
};

export default Card;
