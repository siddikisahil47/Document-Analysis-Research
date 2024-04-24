export const handleSendMessage = (messages, setMessages, message, aiResponse) => {
    setMessages([
        ...messages,
        { text: message, isUser: true },
        { text: aiResponse, isUser: false }, // AI assistant response
    ]);
};