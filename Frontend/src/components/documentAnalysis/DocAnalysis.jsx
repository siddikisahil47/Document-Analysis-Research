import React, { useState } from "react";
import DocUploader from "./documentUploader/DocUploader";
import Chatbot from "./chatbot/Chatbot";
import "./DocAnalysis.css";

const DocAnalysis = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="h-1/6 pt-10">
        <span className="md:text-7xl sm:text-6xl text-6xl font-bold md:py-2 text-heading" id = "heading">
          Document Analysis
        </span>
      </div>
      <div className="h-1/6 mt-5">
        <span className="md:text-1xl sm:text-2xl font-semibold text-white" id = "sub-heading">
          Upload your document to get started
        </span>
      </div>

      <div className="flex flex-row item-center justify-center h-5/6 w-full mb-20">
        <DocUploader
          className="item-center"
          onUpload={() => setChatbotVisible(true)}
        />
        {isChatbotVisible && <Chatbot />}
      </div>
    </div>
  );
};

export default DocAnalysis;
