import React, { useEffect, useState, useRef, useCallback } from 'react';
import './BalanceGameMain.css';
import { useNavigate } from 'react-router-dom';
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


const BalanceGame = () => {
  const navigate = useNavigate();
  const [heartCount, setHeartCount] = useState(2234); //더미데이터
  const [commentCount, setCommentCount] = useState(3254); //더미데이터
  const [isParticipated, setIsParticipated] = useState(true); // 유저 참여 여부

  return (
    <div className="balance-game-container">
      <div className="balance-game-title">
        황금밸런스! 밸런스 게임
      </div>
      <div className="balance-game-question-container">
        <div className="balance-game-question"> Q. 일 할래, 놀래? </div>
        <div className="balance-game-selectbox">
          <div className="selectbox-button" onClick={() => navigate('/balancegamepost')}>
            <div className="left-option-title"> 월 500 받고 매일 야근하기 </div>
            <div className="vs"> vs </div>
            <div className="right-option-title"> 월 100 받고 백수 생활하기 </div>
          </div>
         <div className="selectbox-count">
            <div className="balance-heart-count"> ❤️ {heartCount} </div>
            <div className="balance-comment-count"> 💬 {commentCount} </div>
            <div className="balance-status"> {isParticipated ? '미참여' : '참여완료'} </div>
          </div>
        </div>

        <div className="balance-game-question"> Q. 삼격살 후식은 냉면 </div>
        <div className="balance-game-selectbox">
          <div className="selectbox-button" onClick={() => navigate('/balancegamepost')}>
            <div className="left-option-title"> 평생 탄수화물 안먹기 </div>
            <div className="vs"> vs </div>
            <div className="right-option-title"> 평생 단백질 안먹기 </div>
          </div>
         <div className="selectbox-count">
         <div className="balance-heart-count"> ❤️ {heartCount} </div>
            <div className="balance-comment-count"> 💬 {commentCount} </div>
            <div className="balance-status"> {isParticipated ? '미참여' : '참여완료'} </div>
         </div>
        </div>

        <div className="balance-game-question"> Q. 나한테 왜 그래요? </div>
        <div className="balance-game-selectbox">
          <div className="selectbox-button" onClick={() => navigate('/balancegamepost')}>
            <div className="left-option-title"> 평생 불편하게 잠자기 </div>
            <div className="vs"> vs </div>
            <div className="right-option-title"> 평생 맛없는 음식만 먹기</div>
          </div>
           <div className="selectbox-count">
           <div className="balance-heart-count"> ❤️ {heartCount} </div>
            <div className="balance-comment-count"> 💬 {commentCount} </div>
            <div className="balance-status"> {isParticipated ? '미참여' : '참여완료'} </div>
          </div>
        </div>
      </div>
      <button className="suggest-button"> 주제 제안하기 </button>
    </div>
  );
};

const PageNation = () => {
  return (
      <div className="pagination">
              <button className="previous-page">{"<"}</button>
              {[1, 2, 3, 4, 5].map((num) => (
                  <button key={num} className="page-number">{num}</button>
              ))}
              <button className="next-page">{">"}</button>
          </div>
  );
};

const BalanceGameMain = () => {
  return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <BalanceGame />
        <PageNation />
      </div>
    );
  };

export default BalanceGameMain;