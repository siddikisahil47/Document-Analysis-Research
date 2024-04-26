import React, { useState } from 'react';
import DocUploader from './documentUploader/DocUploader';
import Chatbot from './chatbot/Chatbot';

const DocAnalysis = () => {
    const [isChatbotVisible, setChatbotVisible] = useState(false);

    return (
        <div className='flex items-center justify-center flex-col h-screen'>
            <div className='h-1/6 pt-10'>
                <span className='text-text text-6xl'>Document Analysis</span>
            </div>
            
            <div className="flex flex-row item-center justify-center h-5/6 w-full mb-20">
                <DocUploader className="item-center" onUpload={() => setChatbotVisible(true)} />
                {isChatbotVisible && <Chatbot />}
            </div>
        </div>
    );
}

export default DocAnalysis;