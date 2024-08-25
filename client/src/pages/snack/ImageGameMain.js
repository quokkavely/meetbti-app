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

const getPaginationRange = (currentPage, totalPages) => {
    const range = [];
    const start = Math.floor((currentPage - 1) / 5) * 5 + 1;
    const end = Math.min(start + 4, totalPages);
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const paginationRange = getPaginationRange(currentPage, totalPages); // 함수 사용

    return (
        <div className="pagination">
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}    
                className="previous-page">
                {"<"}
            </button>
            {paginationRange.map((page) => (
                <button 
                    key={page} 
                    className="page-number" 
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
            <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="next-page">
                {">"}
            </button>
        </div>
    );
};

// ImageGameList 컴포넌트에서 games 데이터를 props로 받도록 수정
const ImageGameList = ({ games, currentPage, itemsPerPage }) => {
    const navigate = useNavigate();

    // 최신순으로 정렬
    const sortedGames = [...games].sort((a, b) => b.id - a.id);

    // 현재 페이지에 맞는 게임 목록 가져오기
    const currentGames = sortedGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleGameClick = (gameId) => {
        const votedGames = JSON.parse(localStorage.getItem('votedGames')) || [];
        if (votedGames.includes(gameId)) {
            navigate(`/imagegame-result`);
        } else {
            navigate(`/imagegame-page`);
        }
    };
    
    return (
        <div className="image-game-container">
            <div className="image-game-container-title">
                이건 바로 너! 이미지 게임
            </div>
            <div className="image-game-question-container">
                {currentGames.map(game => (
                    <div key={game.id} className="image-game-selectbox" onClick={() => handleGameClick(game.id)}>
                        <div className="image-game-title">{game.title}</div>
                        <div className="image-game-selectbox-count">
                            <div className="image-heart-count">❤️ {game.heartCount}</div>
                            <div className="image-comment-count">💬 {game.commentCount}</div>
                            <div className="image-status">{game.isParticipated ? '참여완료' : '미참여'}</div>
                        </div>
                    </div>   
                ))}
            </div>

            <button className="image-suggest-button" onClick={() => navigate('/imagegame-registration')}>주제 제안하기</button>
        </div>
    );
};

const ImageGameMain = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // 게임 데이터를 상태로 정의
    const [games, setGames] = useState([]);

    useEffect(() => {
        let storedGames = [];
        const storedGamesString = localStorage.getItem('games');
        if (storedGamesString) {
            try {
                storedGames = JSON.parse(storedGamesString);
            } catch (error) {
                console.error('로컬 스토리지에서 게임 데이터를 파싱하는 중 오류가 발생했습니다:', error);
            }
        }
        setGames(storedGames);
    }, []);

    const totalPages = Math.ceil(games.length / itemsPerPage); 

    return (
        <div className="app">
            <AppContainerComponent />
            <HeaderComponent />
            <ImageGameList games={games} currentPage={currentPage} itemsPerPage={itemsPerPage} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
};

export default ImageGameMain;