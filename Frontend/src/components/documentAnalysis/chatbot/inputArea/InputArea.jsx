import React, { useState } from 'react';
import './inputArea.css';

const InputArea = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage('');
    };

    const submitMessage = async () => {
        try {
            const response = await fetch('http://localhost:8080/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
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
            >
                Submit
            </button>
        </form>
    );
};

export default InputArea;