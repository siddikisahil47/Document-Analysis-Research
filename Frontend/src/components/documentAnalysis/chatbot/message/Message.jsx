import React from 'react';
import Markdown from 'react-markdown';

const Message = ({ text, isUser }) => {
    const messageClass = isUser ? 'bg-primary text-heading self-end py-2' : 'bg-secondary text-heading self-start py-2';
    return (
        <div className={`p-6 mb-4 rounded-[30px] max-w-[85%] ${messageClass}`}>
            <Markdown>{text}</Markdown>
        </div>
    );
};

export default Message;