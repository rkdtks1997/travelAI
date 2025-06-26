import React from 'react';

// 뒤로가기 함수 - listView로 이동
export const PreviousPageButton = () => {
    console.log('뒤로가기 버튼 클릭됨 - listView로 이동');
    return 'listView';
};

// 리스트뷰 클릭 함수
export const ListViewClick = (chatId) => {
    console.log('리스트뷰 클릭됨, 채팅방 ID:', chatId);
    return {
        type: 'LIST_VIEW_CLICK',
        chatId: chatId
    };
};

// 대화창 삭제 함수
export const DeleteChat = (chatId) => {
    console.log('대화창 삭제됨, 채팅방 ID:', chatId);
    return {
        type: 'DELETE_CHAT',
        chatId: chatId
    };
};

// 메뉴 클릭 함수
export const MenuClick = () => {
    console.log('메뉴 버튼 클릭됨');
    return {
        type: 'MENU_CLICK',
        options: ['설정', '도움말', '정보']
    };
};

// 채팅방 생성 함수
export const CreateNewChat = () => {
    console.log('새 채팅방 생성됨');
    const newChatId = Date.now().toString();
    return {
        type: 'CREATE_NEW_CHAT',
        chatId: newChatId,
        timestamp: new Date().toISOString()
    };
};

// 채팅방 목록 가져오기 함수
export const GetChatList = () => {
    const chatList = JSON.parse(localStorage.getItem('chatList') || '[]');
    return chatList;
};

// 채팅방 목록 저장 함수
export const SaveChatList = (chatList) => {
    localStorage.setItem('chatList', JSON.stringify(chatList));
    return true;
};

// 채팅방 정보 업데이트 함수
export const UpdateChatInfo = (chatId, newInfo) => {
    const chatList = GetChatList();
    const updatedList = chatList.map(chat => 
        chat.id === chatId ? { ...chat, ...newInfo } : chat
    );
    SaveChatList(updatedList);
    return updatedList;
};

export default {
    PreviousPageButton,
    ListViewClick,
    DeleteChat,
    MenuClick,
    CreateNewChat,
    GetChatList,
    SaveChatList,
    UpdateChatInfo
};