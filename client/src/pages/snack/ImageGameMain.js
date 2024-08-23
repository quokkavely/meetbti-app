import React, { useEffect, useState, useRef, useCallback } from 'react';
import './ImageGameMain.css';
import { useNavigate } from 'react-router-dom';

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

const BalanceGameList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [games, setGames] = useState([
        // 예시 데이터
        { id: 1, title: '마음에 들면 고백부터 할 것 같은 MBIT는? 금사빠는 누구?', heartCount: 1056, commentCount: 526, isParticipated: true },
        { id: 2, title: '가장 성격이 안좋은 MBIT는?', heartCount: 1525, commentCount: 1014, isParticipated: false },
        { id: 3, title: '비밀을 가장 잘 지켜줄 것 같은 MBIT는?', heartCount: 2630, commentCount: 756, isParticipated: true },
        { id: 4, title: '제일 짜증을 잘 낼 것 같은 MBIT는?', heartCount: 855, commentCount: 225, isParticipated: false },
        // 더 많은 게임 데이터
    ]);
    const itemsPerPage = 3;

    // 최신순으로 정렬
    const sortedGames = [...games].sort((a, b) => b.id - a.id);

    // 현재 페이지에 맞는 게임 목록 가져오기
    const currentGames = sortedGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
    return (
        <div className="image-game-container">
            <div className="image-game-container-title">
                이건 바로 너! 이미지 게임
            </div>
            <div className="image-game-question-container">
                {currentGames.map(game => (
                    <div key={game.id} className="image-game-selectbox" onClick={() => navigate(`/ImageGameResult/${game.id}`)}>
                        <div className="image-game-title">{game.title}</div>
                        <div className="image-game-selectbox-count">
                            <div className="image-heart-count">❤️ {game.heartCount}</div>
                            <div className="image-comment-count">💬 {game.commentCount}</div>
                            <div className="image-status">{game.isParticipated ? '참여완료' : '미참여'}</div>
                        </div>
                    </div>   
                ))}
            </div>

        <button className="image-suggest-button" onClick={() => navigate('/')}>주제 제안하기</button>

        <div className="pagination">
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}    
                 className="previous-page">
                {"<"}
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} className="page-number">{num}</button>
            ))}
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentGames.length < itemsPerPage}
                className="next-page">
                {">"}
            </button>
        </div>
    </div>
    );
};

const ImageGameMain = () => {
    return (
        <div className="app">
          <AppContainerComponent />
          <HeaderComponent />
          <BalanceGameList />
        </div>
      );
};
  
export default ImageGameMain;