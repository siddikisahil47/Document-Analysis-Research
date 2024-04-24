import React, { useState } from 'react';
import './inputArea.css';
import { handleSendMessage } from '../MessageHandler'; 

const InputArea = ({ onSendMessage, messages, setMessages }) => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    const submitMessage = async () => {
        setIsSubmitting(true);
        // POST request
        try {
            await fetch('http://localhost:8080/geminiResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: message })  // send the message as a JSON object with an 'input' key
            });
        } catch (error) {
            console.error(error);
        }

        // GET request
        try {
            const response = await fetch('http://localhost:8080/geminiResponse');
            const data = await response.json();
            handleSendMessage(messages, setMessages, message, data.response); 
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="input-area" onSubmit={handleSubmit}>
            <input
                type="text"
                className='input-text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button 
                type="submit" 
                className='input-button'
                onClick={submitMessage}
                disabled={isSubmitting}
            >
                Submit
            </button>
        </form>
    );
};

export default InputArea;