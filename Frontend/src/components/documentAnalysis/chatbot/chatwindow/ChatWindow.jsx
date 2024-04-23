import React from 'react';
import Message from '../message/Message';
import './chatwindow.css';

const ChatWindow = ({ messages }) => {
    return (
        <div className="chat-window">
            <div className='messages-container'>
                {messages.map((message, index) => (
                <Message key={index} text={message.text} isUser={message.isUser} />
            ))}
            </div>
        </div>
    );
};

export default ChatWindow;