import React, { useState } from 'react';
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
        <form className="flex p-2 bg-heading gap-2 rounded-b-3xl" onSubmit={handleSubmit}>
            <input
                type="text"
                className='flex-grow py-2 px-5 border border-gray-300 rounded-full focus:outline-none'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button 
                type="submit" 
                className='py-2 bg-secondary text-heading rounded-full cursor-pointer mr-1 w-24'
                onClick={submitMessage}
                disabled={isSubmitting}
            >
                Submit
            </button>
        </form>
    );
};

export default InputArea;