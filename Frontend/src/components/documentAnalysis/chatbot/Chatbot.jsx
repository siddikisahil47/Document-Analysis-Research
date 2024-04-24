import React, { useState } from 'react';
import ChatWindow from './chatwindow/ChatWindow';
import InputArea from './inputArea/InputArea';
// import './chatbot.css'

const Chatbot = () => {
    const [messages, setMessages] = useState([]);

    return (
        <div className='chatbot'>
            <ChatWindow messages={messages} />
            <InputArea onSendMessage={setMessages} messages={messages} setMessages={setMessages} />
        </div>
    );
};

export default Chatbot;