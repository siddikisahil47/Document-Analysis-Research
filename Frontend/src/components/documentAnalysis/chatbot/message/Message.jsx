import React from 'react';
import './message.css';

const Message = ({ text, isUser }) => {
    const messageClass = isUser ? 'user-message' : 'bot-message';
    return (
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
    );
};

export default Message;