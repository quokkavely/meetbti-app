import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPageHistory.css';

// 컴포넌트 임포트
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';

const AppContainerComponent = () => {
    return (
        <AppContainer />
    );
};

const HeaderComponent = () => {
    return (
        <Header />
    );
};


const HistorySection = () => {
    const navigate = useNavigate();
    
    return (
        <div className="history-section">
            <div className="history-title">
                <img src="heart-purple-img.png" alt="history-title" />
                내 활동 내역
            </div>
            <div className="history-list">
                <div className="history-MBTI" onClick={() => navigate('/mymbtihistory')}>
                    <img src="history-img.png" alt="history-item"/>
                    내 MBTI 기록
                </div>
                <div className="history-post" onClick={() => navigate('/myposthistory')}>
                    <img src="post-img.png" alt="history-item" />
                    내가 쓴 게시글
                </div>
                <div className="history-comment" onClick={() => navigate('/mycommenthistory')}>
                    <img src="comment-img.png" alt="history-item" />
                    내가 쓴 댓글
                </div>
                <div className="history-like" onClick={() => navigate('/myhearthistory')}>
                    <img src="heart-red-img.png" alt="history-item" />
                    내 좋아요 목록
                </div>
                <div className="history-snack" onClick={() => navigate('/mysnackhistory')}>
                    <img src="smile-img.png" alt="history-item" />
                    참여한 스낵
                </div>
            </div>
            <div className="bottom-logo-box">
                <img src="logo-icon.png" alt="logo-box" />
            </div>
        </div>
    );
};



const MyPageHistory = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <HistorySection />
      </div>
    );
  };
  
  export default MyPageHistory;