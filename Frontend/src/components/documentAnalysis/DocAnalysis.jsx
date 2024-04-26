import React, { useState } from "react";
import DocUploader from "./documentUploader/DocUploader";
import Chatbot from "./chatbot/Chatbot";
import "./DocAnalysis.css";

const DocAnalysis = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="h-1/6 pt-10 " id = "top">
        <span className="md:text-7xl sm:text-6xl text-6xl font-bold md:py-2 text-heading pl-[365px]" id = "heading">
          Document Analysis
        </span>
      </div>
      <div className="h-1/6 pt-6 pl-[500px]" id = "text">
        <span className="text-2xl mt-10 text-white" id = "sub-heading">
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
