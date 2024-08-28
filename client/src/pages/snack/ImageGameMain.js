import React, { useEffect, useState } from 'react';
import './ImageGameMain.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';
import sendGetImageGameRequest from '../../requests/GetImageGamesRequest';
import sendGetImageGamesRequest from '../../requests/GetImageGamesRequest';

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

const ImageGameList = (props) => {
    const navigate = useNavigate();
    return (
        <div className="image-game-container">
            <div className="image-game-container-title">
                이건 바로 너! 이미지 게임
                {!props.loading && props.games.map((game, index) => (
                    <div key={`${game.id}-${index}`} className="image-game-selectbox" onClick={() => navigate(`/imagegame-page?gameId=${game.gameId}`)}>
                        <div className="image-game-title">{game.topic}</div>
                        <div className="image-game-selectbox-count">
                            <div className="image-heart-count">❤️ {game.heartCount}</div>
                            <div className="image-comment-count">💬 {game.comments.length}</div>
                            <div className="image-status">{game.isParticipated ? '참여완료' : '미참여'}</div>
                        </div>
                    </div>
                ))}
                {props.games.length === 0 && <div className="no-games-message">등록된 게임이 없어요...</div>}
            </div>
        </div>
    );
};

const ImageGameSuggestButton = (props) => {
    const navigate = useNavigate();
    return (
        <button className="image-suggest-button" onClick={() => {
            if(props.category === 'NONE'){
                if(window.confirm('MBTI가 없어요. 첫 테스트를 진행하시겠어요?')){
                    navigate('/mbti-test');
                };
                return;
            }
            navigate('/imagegame-registration')
            }}>주제 제안하기</button>
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

const ImageGameMain = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const { state } = useAuth();
    const [games, setGames] = useState({data:[]});
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const [myData, setMyData] = useState('');
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);
    const [postImageGame, setPostImageGame] = useState([]);
    
    const updateMyData = (data) => {
        setMyData(data);
    }

    useEffect(() => {
        const param = params.get('gameId'); // 'param' 변수를 올바르게 초기화
        sendGetMyinfoRequest(state, updateMyData);
        sendGetImageGameRequest(state, 1, 3, setLoading, setGames, param);
        sendGetImageGamesRequest(state, 1, 3, setLoading, setPostImageGame, param); // 'page', 'size', 'gameId' 변수 수정
        console.log("이미지 게임 페이지 로딩 완료");
    }, []);

    useEffect(() => {
        // 페이지 변경 시 데이터를 다시 로드
        const param = params.get('gameId');
        sendGetImageGameRequest(state, currentPage, itemsPerPage, setLoading, setGames, param);
        sendGetImageGamesRequest(state, currentPage, itemsPerPage, setLoading, setPostImageGame, param);
    }, [currentPage]);

    return (
        <div className="app">
            <AppContainerComponent />
            <HeaderComponent />
            <ImageGameList games={games.data} loading={loading}/>
            <ImageGameSuggestButton />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
};

export default ImageGameMain;