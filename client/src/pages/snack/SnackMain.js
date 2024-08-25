import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SnackMain.css';

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

const SnackMainTitle = () => {
    return (
        <div className="snackmain-title">MeetBTI가 추천하는<br/> 킬러 컨텐츠!</div>
    );
};

const SnackMainContent = () => {
    const navigate = useNavigate();
    return (
        <div className="snackmain-content">
            <div className="imagegame" onClick={() => navigate('/imagegame')}>
                <img src="/public-img/Image-img.jpeg" alt='imagegame' />
                <div className="overlay-text">Image Game</div>
            </div>
            <div className="balancegame" onClick={() => navigate('/balancegame')}>
                <img src="/public-img/balance-img.jpeg" alt='balancegame' />
                <div className="overlay-text">Balance Game</div>
            </div>
            <div className="MBTMI" onClick={() => navigate('/MBTMI')}>
                <img src="/public-img/MBTMI-img.png" alt='MBTMI' />
            </div>
        </div>
    );
};

const SnackMain = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <SnackMainTitle />
        <SnackMainContent />
      </div>
    );
  };
  
  export default SnackMain;