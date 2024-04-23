export const handleSendMessage = (messages, setMessages, message) => {
    setMessages([
        ...messages,
        { text: message, isUser: true },
        // Add any bot response logic here
        { text: "Your response here", isUser: false }, // Bot response
    ]);
};