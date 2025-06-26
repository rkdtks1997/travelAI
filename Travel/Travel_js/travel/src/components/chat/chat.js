import React, { useState, useRef, useEffect } from 'react';
import { MenuClick } from '../../util/buttonUtil';
import './chat.css';

function Chat({ chatId, onBackToList }) {
    const [userMessage, setUserMessage] = useState('');
    const [travelHistory, setTravelHistory] = useState([]);
    const [showSummary, setShowSummary] = useState(false);
    const [summary, setSummary] = useState('');
    const feedEndRef = useRef(null);

    // 메시지가 추가될 때마다 스크롤을 맨 아래로
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
        onBackToList();
    };

    const handleMenu = () => {
        const result = MenuClick();
        if (travelHistory.length > 0) {
            generateSummary();
            setShowSummary(true);
        }
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

    return (
        <div className="chat-container">
            {/* 헤더 */}
            <header className="chat-header">
                <div className="header-buttons">
                    <button className="back-button" onClick={handleBack}>
                        ←
                    </button>
                    <div className="header-content">
                        <h1>여행 AI 전문가</h1>
                        <p>채팅방 ID: {chatId}</p>
                    </div>
                    <button className="menu-button" onClick={handleMenu}>
                        ⋯
                    </button>
                </div>
            </header>

            {/* 채팅 영역 */}
            <main className="chat-main">
                <div className="chat-feed">
                    {travelHistory.map((msg, i) => (
                        <div key={i} className={`chat-message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                            <div className="message-header">
                                <span className="message-username">
                                  {msg.role === 'user' ? '나' : '솔로몬텍'}
                                </span>
                            </div>
                            <div className="message-content">
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={feedEndRef} />
                </div>
            </main>

            {/* 입력 폼 */}
            <footer className="chat-footer">
                <form onSubmit={handleSubmit} className="input-form">
                    <input
                        type="text"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="질문을 입력해주세요."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">
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

export default Chat; 