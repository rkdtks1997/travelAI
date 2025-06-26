import React, { useState } from 'react';
import ListView from './components/listView/listView';
import Chat from './components/chat/chat';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('list'); // 'list' 또는 'chat'
    const [currentChatId, setCurrentChatId] = useState(null);

    const handleChatSelect = (chatId) => {
        setCurrentChatId(chatId);
        setCurrentPage('chat');
    };

    const handleBackToList = () => {
        setCurrentPage('list');
        setCurrentChatId(null);
    };

    return (
        <div className="app">
            {currentPage === 'list' ? (
                <ListView 
                    onChatSelect={handleChatSelect}
                    onBackToMain={handleBackToList}
                />
            ) : (
                <Chat 
                    chatId={currentChatId}
                    onBackToList={handleBackToList}
                />
            )}
        </div>
    );
}

export default App;
