import React from 'react';
import Message from '../message/Message';

const ChatWindow = ({ messages }) => {
    return (
<div className="flex flex-col overflow-y-scroll h-[650px]  scrollbar-hide bg-text rounded-t-3xl transition-all duration-500 ease-in-out">
            <div className='flex flex-col p-2 '>
                {messages.map((message, index) => (
                <Message key={index} text={message.text} isUser={message.isUser} />
            ))}
            </div>
        </div>
    );
};

export default ChatWindow;