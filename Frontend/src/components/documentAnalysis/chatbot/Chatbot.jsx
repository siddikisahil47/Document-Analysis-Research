import React, { useState } from 'react';
import ChatWindow from './chatwindow/ChatWindow';
import InputArea from './inputArea/InputArea';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);

    return (
        <div className='flex flex-col justify-end mr-5 mt-12 bg-primary w-3/4'>
            <ChatWindow messages={messages} />
            <InputArea onSendMessage={setMessages} messages={messages} setMessages={setMessages} />
        </div>
    );
};

export default Chatbot;