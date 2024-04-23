import React, { useState, useRef } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "./docAnalysis.css"

const DocAnalysis = () => {
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [isInputVisible, setInputVisible] = useState(true);
    const [isChangeButtonVisible, setChangeButtonVisible] = useState(false);
    const [isUploadButtonVisible, setUploadButtonVisible] = useState(false);
    const fileInputRef = useRef(null);

    const handleUpload = async () => {
        const formData = new FormData();
        selectedDocs.forEach((doc) => {
            formData.append('file', doc);
        });

        const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.text();
        console.log(result);

        setInputVisible(false);
        setChangeButtonVisible(false);
        setUploadButtonVisible(false);
    };

    const handleChangeDocument = () => {
        fileInputRef.current.click();
        setUploadButtonVisible(true);
    };

    return (
        <div className="DocAnalysis">
            <h1>Document Analysis</h1>
            <div className="UploadSection">
                <h2>Upload Section</h2>
                <input
                    ref={fileInputRef}
                    style={{ display: isInputVisible ? 'block' : 'none' }}
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(el) => {
                        el.target.files?.length &&
                        setSelectedDocs(Array.from(el.target.files));
                        setInputVisible(false);
                        setChangeButtonVisible(true);
                        setUploadButtonVisible(true);
                    }}
                />
                {isChangeButtonVisible && (
                    <button onClick={handleChangeDocument}>Change Document</button>
                )}
                {isUploadButtonVisible && (
                    <button onClick={handleUpload}>Upload</button>
                )}
            </div>
            <div className="DocViewerContainer">
                <DocViewer
                    documents={selectedDocs.map((file) => ({
                        uri: window.URL.createObjectURL(file),
                        fileName: file.name,
                    }))}
                    pluginRenderers={DocViewerRenderers}
                    config={{
                        header: {
                            disableHeader: false,
                            disableFileName: false,
                            retainURLParams: true,
                        },
                        csvDelimiter: ",", // "," as default,
                        pdfZoom: {
                            defaultZoom: 1.1, // 1 as default,
                            zoomJump: 0.2, // 0.1 as default,
                        },
                        pdfVerticalScrollByDefault: true, // false as default
                    }}
                />
            </div>
        </div>
    );
}

export default DocAnalysis;