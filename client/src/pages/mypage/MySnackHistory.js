import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MySnackHistory.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetImagegameResultsRequest from '../../requests/GetImagegameResultsRequest';
import sendGetMyInfoRequest from '../../requests/GetMyInfo';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/page_container/PageContainer';
import sendGetBalancegameResultsRequest from '../../requests/GetBalancegameResultsRequest';


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

const SnackHistoryTitle = () => {
    return (
        <div className="snack-history-title" >
            <img src="public-img/smile-img.png" alt="history-item"/>
            참여한 스낵
        </div>
    );
};


const Historyrecenttext = ( { setCategory, state, page, setResults, setLoading, setPage}) => {
    return (
        <div className="history-recenttext">
            <select onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
                }}>
                <option disabled>선택</option>
                <option>이미지게임</option>
                <option>밸런스게임</option>
            </select>
        </div>
    );
};


const MySnackHistory = () => {
    const [category, setCategory] = useState('이미지게임');
    const { state } = useAuth();
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState({data:[]});
    const [page, setPage] = useState(1);
    const [myData, setMyData] = useState({data:{}});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        sendGetMyInfoRequest(state, setMyData);
        if(category === '이미지게임'){
            sendGetImagegameResultsRequest(state, page, 3, state.memberId, setHistoryData, setIsLoading);
        } else if(category === '밸런스게임'){
            sendGetBalancegameResultsRequest(state, page, 3, state.memberId, setHistoryData, setIsLoading);
        }
    }, [page, category]);

    const getContents = () => {
        if(category === '이미지게임'){
            return (
                historyData.data.map((game, index) => (
                    <div /* key={`${game.gameId}-${index}`} */ className="image-game-selectbox" onClick={() => navigate((game.selectedOption === '' ? `/imagegame-page?gameId=${game.gameId}` : `/imagegame-result?gameId=${game.gameId}`))}>
                        <div className="image-game-title">{game.topic}</div>
                        <div className="image-game-selectbox-count">
                            <div className="image-heart-count">❤️ {game.heartCount}</div>
                            <div className="image-comment-count">💬 {game.commentCount}</div>
                        </div>
                    </div>
                ))
            );
        } else if(category === '밸런스게임'){
            return (
                historyData.data.map((game, index) => (
                    <div className="balancegame-component">
                        <div className="balance-game-question">{game.title}</div>
                        <div className="balance-game-selectbox" onClick={() => navigate(`/balancegamepost?gameId=${game.gameId}`)}>
                        <div className="selectbox-button">
                            <div className="left-option-title"> {game.leftOption} </div>
                            <div className="vs"> vs </div>
                            <div className="right-option-title"> {game.rightOption} </div>
                        </div>
                        <div className="selectbox-count">
                            <div className="balance-heart-count"> ❤️ {game.heartCount} </div>
                            <div className="balance-comment-count"> 💬 {game.commentCount} </div>
                        </div>
                    </div>
                </div>
                ))
            );
        } 
    }
    console.log('snackPage: ', page);
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <SnackHistoryTitle />
        <Historyrecenttext setCategory={setCategory} state={state} page={page}
        setResults={setHistoryData} setLoading={setIsLoading} setPage={setPage}/>
        <div className="history-section">
            <div className="image-game-container">
                <div className="image-game-container-title">
                    내가 참여한 게임
                    {isLoading ? <div></div> : getContents()}
                    {historyData.length === 0 && <div className="no-games-message">참가한 게임이 없어요</div>}
                </div>
            </div>
            {isLoading ? <div></div> : 
            <PageContainer 
                currentPage={page} 
                pageInfo={historyData.pageInfo} 
                getPage={(page) => sendGetImagegameResultsRequest(state, page, 3, state.memberId, setHistoryData, setIsLoading)}
                setPageOriginal={setPage}
            ></PageContainer>}
        </div>
      </div>
    );
  };
export default MySnackHistory;