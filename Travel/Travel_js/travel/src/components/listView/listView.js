import React, { useState, useEffect } from 'react';
import { 
    GetChatList, 
    SaveChatList, 
    DeleteChat, 
    CreateNewChat,
    ListViewClick 
} from '../../util/buttonUtil';
import './listView.css';

function ListView({ onChatSelect, onBackToMain }) {
    const [chatList, setChatList] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);

    useEffect(() => {
        loadChatList();
    }, []);

    const loadChatList = () => {
        const savedChatList = GetChatList();
        if (savedChatList.length === 0) {
            // 초기 채팅방 생성
            const initialChats = [
                {
                    id: '1',
                    title: '도쿄 여행 계획',
                    lastMessage: '도쿄에서 꼭 가봐야 할 곳이 있을까요?',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    unreadCount: 2,
                    profileImage: '🗾'
                },
                {
                    id: '2',
                    title: '파리 맛집 추천',
                    lastMessage: '파리에서 꼭 먹어봐야 할 음식은?',
                    timestamp: new Date(Date.now() - 7200000).toISOString(),
                    unreadCount: 0,
                    profileImage: '🥐'
                },
                {
                    id: '3',
                    title: '제주도 3박4일',
                    lastMessage: '제주도 여행 일정을 짜주세요',
                    timestamp: new Date(Date.now() - 86400000).toISOString(),
                    unreadCount: 1,
                    profileImage: '🏝️'
                }
            ];
            SaveChatList(initialChats);
            setChatList(initialChats);
        } else {
            setChatList(savedChatList);
        }
    };

    const handleChatClick = (chatId) => {
        const result = ListViewClick(chatId);
        onChatSelect(chatId);
    };

    const handleNewChat = () => {
        const newChat = CreateNewChat();
        const chatData = {
            id: newChat.chatId,
            title: '새로운 여행',
            lastMessage: '새로운 여행을 시작해보세요!',
            timestamp: newChat.timestamp,
            unreadCount: 0,
            profileImage: '✈️'
        };
        
        const updatedList = [chatData, ...chatList];
        SaveChatList(updatedList);
        setChatList(updatedList);
        onChatSelect(newChat.chatId);
    };

    const handleDeleteChat = (chatId) => {
        setSelectedChatId(chatId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedChatId) {
            const result = DeleteChat(selectedChatId);
            const updatedList = chatList.filter(chat => chat.id !== selectedChatId);
            SaveChatList(updatedList);
            setChatList(updatedList);
        }
        setShowDeleteModal(false);
        setSelectedChatId(null);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return '방금 전';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}시간 전`;
        } else {
            return date.toLocaleDateString('ko-KR', { 
                month: 'short', 
                day: 'numeric' 
            });
        }
    };

    return (
        <div className="list-view-container">
            {/* 헤더 */}
            <header className="list-header">
                <button className="back-button" onClick={onBackToMain}>
                    ←
                </button>
                <h1>여행 대화방</h1>
                <button className="new-chat-button" onClick={handleNewChat}>
                    +
                </button>
            </header>

            {/* 채팅방 목록 */}
            <div className="chat-list">
                {chatList.map((chat) => (
                    <div 
                        key={chat.id} 
                        className="chat-item"
                        onClick={() => handleChatClick(chat.id)}
                    >
                        <div className="chat-profile">
                            <span className="profile-image">{chat.profileImage}</span>
                        </div>
                        <div className="chat-content">
                            <div className="chat-header">
                                <h3 className="chat-title">{chat.title}</h3>
                                <span className="chat-time">{formatTime(chat.timestamp)}</span>
                            </div>
                            <div className="chat-footer">
                                <p className="last-message">{chat.lastMessage}</p>
                                {chat.unreadCount > 0 && (
                                    <span className="unread-count">{chat.unreadCount}</span>
                                )}
                            </div>
                        </div>
                        <button 
                            className="delete-chat-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(chat.id);
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* 삭제 확인 모달 */}
            {showDeleteModal && (
                <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
                    <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>대화방 삭제</h3>
                        <p>이 대화방을 삭제하시겠습니까?</p>
                        <div className="modal-buttons">
                            <button 
                                className="cancel-button" 
                                onClick={() => setShowDeleteModal(false)}
                            >
                                취소
                            </button>
                            <button 
                                className="delete-button" 
                                onClick={confirmDelete}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListView; 