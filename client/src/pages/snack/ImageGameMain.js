import React, { useEffect, useState } from 'react';
import './ImageGameMain.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';
import sendGetImageGameRequest from '../../requests/GetImageGamesRequest';
import sendGetImageGamesRequest from '../../requests/GetImageGamesRequest';
import PageContainer from '../../components/page_container/PageContainer';

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
                {props.games.map((game, index) => (
                    <div key={`${game.id}-${index}`} className="image-game-selectbox" onClick={() => navigate((game.selectedOption === '' ? `/imagegame-page?gameId=${game.gameId}` : `/imagegame-result?gameId=${game.gameId}`))}>
                        <div className="image-game-title">{game.topic}</div>
                        <div className="image-game-selectbox-count">
                            <div className="image-heart-count">❤️ {game.heartCount}</div>
                            <div className="image-comment-count">💬 {game.comments.length}</div>
                            <div className="image-status">{game.selectedOption === '' ? '미참여' : '참여완료'}</div>
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
    const [games, setGames] = useState({data:[], pageInfo:{}});
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const [myData, setMyData] = useState('');
    const params = new URLSearchParams(location.search);
    const [isLoading, setIsLoading] = useState(true);
    const [postImageGame, setPostImageGame] = useState([]);
    const [page, setPage] = useState(1);
    
    const updateMyData = (data) => {
        setMyData(data);
    }

    useEffect(() => {
        const param = params.get('gameId'); // 'param' 변수를 올바르게 초기화
        sendGetMyinfoRequest(state, updateMyData);
        sendGetImageGamesRequest(state, page, 3, setIsLoading, setGames); // 'page', 'size', 'gameId' 변수 수정
    }, [page]);

    return (
        <div className="app">
            <AppContainerComponent />
            <HeaderComponent />
            {isLoading ? <div></div> : <ImageGameList games={games.data}/>}
            <ImageGameSuggestButton />
            {/* <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} /> */}
            {isLoading ? <div></div> : <PageContainer currentPage={page} pageInfo={games.pageInfo} 
            getPage={(page) => sendGetImageGamesRequest(state, page, 3, setIsLoading, setGames)}
            setPageOriginal={setPage}
             ></PageContainer>}
        </div>
    );
};

export default ImageGameMain;