import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';

// 컴포넌트 임포트
import AppContainer from '../components/AppContainer';
import Header from '../components/Header';

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

// 마이페이지 유저 정보 컴포넌트
const MyPageUserInfoContainer = () => {
    return (
        <div className="mypage-user-info-container">
            <div className="mypage-user-info-container-inner">
                <img src="catprofile.png" alt="mypage-user-info-img" />
            </div>
            <div className="mypage-user-info-section">
                <div className="mypage-user-info-section-badge"> MBTI </div>
                <div className="mypage-user-info-section-name"> 닉네임이요 </div>
            </div>
        </div>
    );
};


// 마이페이지 유저 정보 버튼 컴포넌트
const MyPageUserInfoButton = () => {
    return (
        <div className="mypage-user-info-button-container">
            <button className="mypage-user-info-modify-button">
                <img src="profile.png" alt="mypage-user-info-modify-button"/> 내 정보 수정
            </button>
            <button className="mypage-user-info-history-button">
                <img src="profile.png" alt="mypage-user-info-history-button"/> 내 활동 내역
            </button>
        </div>
    );
}

// 마이페이지 내 MBTI 버튼 컴포넌트
const MyPageMyMBTIButton = () => {
    return (
        <div className="mypage-my-mbti-button-container">
            <button className="mypage-my-mbti-button"> My MBTI </button>
        </div>
    );
}


// 마이페이지 새 공지사항 컴포넌트
const NewNotice = () => {
    return (
        <div className="mypage-new-notice-container">
            <div className="mypage-new-notice-container-title"> 새로운 소식 </div>
            <div className="mypage-new-notice-container-banner">
                <img src="banner-img.png" alt="notice-banner"/>
            </div>
        </div>
    );
}


const MyPage = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <MyPageUserInfoContainer />
        <MyPageUserInfoButton />
        <MyPageMyMBTIButton />
        <NewNotice />
      </div>
    );
  };
  
  export default MyPage;