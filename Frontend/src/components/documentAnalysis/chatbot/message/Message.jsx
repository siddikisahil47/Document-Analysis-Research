import React from 'react';
import './message.css';
import Markdown from 'react-markdown'


const Message = ({ text, isUser }) => {
    const messageClass = isUser ? 'user-message' : 'bot-message';
    return (
        <div className={`message ${messageClass}`}>
            <Markdown>{text}</Markdown>
        </div>
    );
};

export default Message;