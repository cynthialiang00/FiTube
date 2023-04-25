import React from 'react';
import './Card.css';

const CommentCard = ({img, name, date, text}) => {
    
    return (
        <div className="comment-card">
            <img className="comment-img" src={img} alt={`${name}'s avatar`}></img>
            <div className="comment-name">{name}</div>
            <div className="comment-date">{date}</div>
            <div className="comment-text">{text}</div>
        </div>
    )

};

export default CommentCard;
