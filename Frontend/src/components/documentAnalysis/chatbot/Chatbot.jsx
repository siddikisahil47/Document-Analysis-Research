import React, { useState } from 'react';
import ChatWindow from './chatwindow/ChatWindow';
import InputArea from './inputArea/InputArea';
import { handleSendMessage } from './MessageHandler';
import './chatbot.css'

const Chatbot = () => {
    const [messages, setMessages] = useState([]);

    const onSendMessage = (message) => {
        handleSendMessage(messages, setMessages, message);
    };

    return (
        <div className='chatbot'>
            <ChatWindow messages={messages} />
            <InputArea onSendMessage={onSendMessage} />
        </div>
    );
};

export default Chatbot;