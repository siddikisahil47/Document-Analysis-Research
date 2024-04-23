import React, { useState } from 'react';
import DocUploader from './documentUploader/DocUploader';
import Chatbot from './chatbot/Chatbot';
import './docAnalysis.css';

const DocAnalysis = () => {
    const [isChatbotVisible, setChatbotVisible] = useState(false);

    return (
        <div className="DocAnalysis">
            <span className='title'>Document Analysis</span>
            <div className="content">
                <DocUploader className="DocViewerContainer" onUpload={() => setChatbotVisible(true)} />
                {isChatbotVisible && <Chatbot />}
            </div>
        </div>
    );
}

export default DocAnalysis;