import React, { useEffect, useState, useRef, useCallback } from 'react';
import './BalanceGameMain.css';
import { useNavigate } from 'react-router-dom';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetBalanceGamesRequest from '../../requests/GetBalancegamesRequest';
import { useAuth } from '../../auth/AuthContext';
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



const BalanceGame = ({ state, balancegames, navigate}) => {

  function GameContainer(props){
    return (
      <div className="balancegame-component">
        <div className="balance-game-question">{props.title}</div>
        <div className="balance-game-selectbox">
          <div className="selectbox-button" onClick={() => navigate(`/balancegamepost?gameId=${props.gameId}`)}>
            <div className="left-option-title"> {props.leftOption} </div>
            <div className="vs"> vs </div>
            <div className="right-option-title"> {props.rightOption} </div>
          </div>
         <div className="selectbox-count">
            <div className="balance-heart-count"> ❤️ {props.heartCount} </div>
            <div className="balance-comment-count"> 💬 {props.commentCount} </div>
            <div className="balance-status"> {props.selectedOption === '' ? '미참여' : '참여완료'} </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="balance-game-container">
      <div className="balance-game-title">
        황금밸런스! 밸런스 게임
      </div>
      <div className="balance-game-question-container">
        {balancegames.data.map((value)=> <GameContainer title={value.title} leftOption={value.leftOption} rightOption={value.rightOption} 
        heartCount={value.heartCount} commentCount={value.commentCount} selectedOption={value.selectedOption} gameId = {value.gameId}/>)}
        
      </div>
      <button className="suggest-button" onClick={() => navigate('/balancegameregist')}> 주제 제안하기 </button>
    </div>
  );
};

const BalanceGameMain = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [balancegames, setBalancegames] = useState({data:[]});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sendGetBalanceGamesRequest(state, page, 3, setBalancegames, setIsLoading);
  }, []);

  return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <BalanceGame state = {state} balancegames={balancegames} navigate={navigate}/>
        {isLoading ? <div></div> : 
        <PageContainer
         currentPage={page} 
         pageInfo={balancegames.pageInfo}
         getPage={(page) => sendGetBalanceGamesRequest(state, page, 3, setBalancegames, setIsLoading)}
         ></PageContainer>}
      </div>
    );
  };

export default BalanceGameMain;