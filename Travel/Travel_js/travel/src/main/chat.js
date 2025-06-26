import React, { useState, useRef, useEffect } from 'react';

import ListView from '../components/listView/listView';

import './main.css';

function Main() {
    const [userMessage, setUserMessage] = useState('');
    const [travelHistory, setTravelHistory] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [summary, setSummary] = useState('');
    const [currentPage, setCurrentPage] = useState('list'); // 'list' 또는 'chat'
    const [currentChatId, setCurrentChatId] = useState(null);
    const feedEndRef = useRef(null);

    // ✅ 여기에서 useEffect를 사용해야 합니다
    useEffect(() => {
        feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [travelHistory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const updatedHistory = [...travelHistory, { role: 'user', content: userMessage }];
        setTravelHistory(updatedHistory);
        setUserMessage('');

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await response.json();

            if (data.reply) {
                setTravelHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
            } else {
                setTravelHistory(prev => [...prev, { role: 'assistant', content: "오류 발생: " + data.error }]);
            }
        } catch (error) {
            setTravelHistory(prev => [...prev, { role: 'assistant', content: "네트워크 오류" }]);
        }
    };

    const handleBack = () => {
        // 뒤로가기 버튼 클릭 시 listView로 이동
        setCurrentPage('list');
        setCurrentChatId(null);
        setTravelHistory([]);
    };

    const handleMenu = () => {
        // 메뉴 버튼 클릭 시 요약 생성
        if (travelHistory.length > 0) {
            generateSummary();
            setShowSummary(true);
        }
    };

    const handleChatSelect = (chatId) => {
        setCurrentChatId(chatId);
        setCurrentPage('chat');
        // 여기서 해당 채팅방의 대화 기록을 로드할 수 있습니다
        // 현재는 빈 대화로 시작
        setTravelHistory([]);
    };

    const handleBackToMain = () => {
        setCurrentPage('list');
        setCurrentChatId(null);
        setTravelHistory([]);
    };

    const generateSummary = async () => {
        try {
            const conversationText = travelHistory
                .map(msg => `${msg.role === 'user' ? '사용자' : 'AI'}: ${msg.content}`)
                .join('\n');
            
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: `다음 대화 내용을 간단히 요약해주세요:\n\n${conversationText}` 
                })
            });
            const data = await response.json();

            if (data.reply) {
                setSummary(data.reply);
            } else {
                setSummary("요약을 생성할 수 없습니다.");
            }
        } catch (error) {
            setSummary("요약 생성 중 오류가 발생했습니다.");
        }
    };

    const closeSummary = () => {
        setShowSummary(false);
    };

    // 리스트뷰 페이지 렌더링
    if (currentPage === 'list') {
        return (
            <div className="app-container">
                <ListView 
                    onChatSelect={handleChatSelect}
                    onBackToMain={handleBackToMain}
                />
            </div>
        );
    }

    // 채팅방 페이지 렌더링
    return (
        <div className="app-container">
            {/* 헤더 */}
            <header className="header">
                <div className="header-buttons">
                    <button className="back-button" onClick={handleBack}>
                        ←
                    </button>
                    <div className="header-content">
                        <h1>여행 AI 전문가</h1>
                        <p>채팅방 ID: {currentChatId}</p>
                    </div>
                    <button className="menu-button" onClick={handleMenu}>
                        ⋯
                    </button>
                </div>
            </header>

            {/* 바디 */}
            <main className="main-box">
                <div className="feed-section">
                    {travelHistory.map((msg, i) => (
                        <div key={i} className={`feed-card ${msg.role === 'user' ? 'user-card' : 'assistant-card'}`}>
                            <div className="feed-header">
                                <span className="feed-username">
                                  {msg.role === 'user' ? '나' : '솔로몬텍'}
                                </span>
                            </div>
                            <div className="feed-content">
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={feedEndRef} />
                </div>
            </main>

            {/* 푸터 */}
            <footer className="form-box">
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="질문을 입력해주세요."
                        className="input"
                    />
                    <button type="submit" className="submit-button">
                        전송
                    </button>
                </form>
            </footer>

            {/* 요약 모달 */}
            {showSummary && (
                <div className="modal-overlay" onClick={closeSummary}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>대화 요약</h3>
                            <button className="close-button" onClick={closeSummary}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>{summary}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
