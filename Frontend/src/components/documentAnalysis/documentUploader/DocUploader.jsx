import React, { useState, useRef, useEffect } from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const DocUploader = ({ onUpload }) => {
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [isInputVisible, setInputVisible] = useState(true);
    const [isChangeButtonVisible, setChangeButtonVisible] = useState(false);
    const [isUploadButtonVisible, setUploadButtonVisible] = useState(false);
    const [showDocViewer, setShowDocViewer] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Add the event listener when the component mounts
        window.addEventListener('beforeunload', handleEndSession);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleEndSession);
        };
    }, []);

    const handleEndSession = async (e) => {
        // Prevent the default action to ensure the fetch request is sent
        e.preventDefault();

        // Send a POST request to the /endSession endpoint
        await fetch('http://localhost:8080/endSession', {
            method: 'POST',
        });

        // Return an empty string to show the default confirmation dialog
        return '';
    };

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

        onUpload(); // Call the onUpload prop
    };

    const handleChangeDocument = () => {
        fileInputRef.current.click();
        setUploadButtonVisible(true);
        setShowDocViewer(false); // Hide DocViewer when input button is clicked
    };

    return (
        <div className="flex flex-row-reverse items-center justify-center gap-10">
            {/* <h1>Document Analysis</h1> */}
            <div >
                {/* <h2>Upload Section</h2> */}

                
                <input
                    ref={fileInputRef}
                    style={{ display: isInputVisible ? 'block' : 'none' }}
                    className="text-heading mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:py-2 file:px-4 file:text-sm file:font-semibold file:text-text hover:file:bg-heading hover:file:text-primary hover:file:font-medium focus:outline-none disabled:pointer-events-none disabled:opacity-60 file:transition file:duration-500 file:ease-in-out"
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(el) => {
                        el.target.files?.length &&
                            setSelectedDocs(Array.from(el.target.files));
                        setInputVisible(false);
                        setChangeButtonVisible(true);
                        setUploadButtonVisible(true);
                        setShowDocViewer(true); // Show DocViewer after documents are selected
                    }}
                />
                <div className='flex flex-col items-center justify-center gap-10'>
                    {isChangeButtonVisible && (
                        <button
                            onClick={handleChangeDocument}
                            className='text-heading hover:text-primary'
                        >
                            <div class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-secondary rounded-xl group">
                                <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-primary rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-heading"></span>
                                </span>
                                <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-heading hover:text-secondary rounded-xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                <span class="relative w-full text-left text-heading transition-colors duration-200 ease-in-out group-hover:text-secondary">Change Document</span>
                            </div>
                        </button>
                    )}
                    {isUploadButtonVisible && (
                        <button
                            onClick={handleUpload}
                            className='text-heading hover:text-secondary bg-primary'
                        >
                            <div class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-secondary rounded-xl group">
                                <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-primary rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-heading"></span>
                                </span>
                                <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-heading hover:text-secondary rounded-xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                <span class="relative w-full text-left text-heading transition-colors duration-200 ease-in-out group-hover:text-secondary">Upload</span>
                            </div>
                        </button>

                    )}
                </div>

            </div>
            <div className='rounded-3xl'>
                {showDocViewer && (
                    <DocViewer
                    className='mt-55'
                        style={{ width: 500, height: 700, marginLeft: 20, marginTop: 50, borderRadius:24,  }}
                        // className='doc-viewer'
                        documents={selectedDocs.map((file) => ({
                            uri: window.URL.createObjectURL(file),
                            fileName: file.name,
                        }))}
                        pluginRenderers={DocViewerRenderers}
                        config={{
                            header: {
                                disableHeader: true,
                                disableFileName: true,
                                retainURLParams: true,
                            },
                            csvDelimiter: ",", // "," as default,
                            pdfZoom: {
                                defaultZoom: 1.1, // 1 as default,
                                zoomJump: 0.2, // 0.1 as default,
                            },
                            pdfVerticalScrollByDefault: false, // false as default
                        }}
                    />
                )}

            </div>
        </div>
    );
}

export default DocUploader;