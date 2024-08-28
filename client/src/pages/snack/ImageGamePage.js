import React, { useContext, useEffect, useState } from 'react';
import Header from "../../components/basic_css/Header";
import './ImageGamePage.css';
import { VoteContext } from '../../context/VoteContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import sendGetSingleImageGameRequest from '../../requests/GetSingleImageGameRequest';
import CommentUserInfoContainer from '../../components/user_info_container/CommentUserInfoContainer';
import sendPostBalancegameResultRequest from '../../requests/PostImagegameResultRequest';

const mbtiButtonsA = [{id:'ENFP'}, {id:'ESFJ'}, {id:'ISFP'}, {id:'ESFP'}, {id:'ESTP'}, {id:'ISTJ'}, {id:'INTJ'}, {id:'ENTP'}];
const mbtiButtonsB = [{id:'ENFJ'}, {id:'INFP'}, {id:'INFJ'}, {id:'ISFJ'}, {id:'ESTJ'}, {id:'ENTJ'}, {id:'ISTP'}, {id:'INTP'}];


const ImageGamePage = ( ) => {
    const { state } = useAuth(); // 인증 상태를 가져옴
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const gameId = params.get("gameId");
    const [gameData, setGameData] = useState({data:[]}); // 초기값 빈 객체
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [myData, setMyData] = useState({data:{}});


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    //서버에서 가져오는 부분
    useEffect(() => {
        sendGetSingleImageGameRequest(state, gameId, setGameData, setIsLoading, navigate, 'imagegame-main');
    }, []);

    const handleSend = () => {
        if(myData.data.mbti === 'NONE'){
            if(window.confirm('MBTI가 없어서 댓글을 등록할 수 없어요. 첫 테스트를 하러 가시겠어요?')){
                navigate('/mbti-test');
            }
            return;
        }
        /* sendPostBalanceGameCommentRequest(state, params.get('gameId'), inputValue, setInputValue, 
        () => sendGetSingleBalanceGameRequest(state, params.get('gameId'), setGameData, setIsLoading) */
    };

    const handleVote = (selectedOption) => {
        if(gameData.data.selectedOption !== ''){
            alert('이미 투표하셨어요');
            return;
        }
        sendPostBalancegameResultRequest(state, gameId, selectedOption, navigate/* () => sendGetSingleImageGameRequest(state, gameId, setGameData, setIsLoading, navigate) */);
    }

    return (
        <div className="app">
            <Header></Header>
            {isLoading ? <div /> : <div className="imagegame-title">{gameData.data.topic}</div>}
            {/* {!loading && <h2 className="imagegame-title">{imageGameData.data.topic}</h2>} */}
            <div className="imagegame-author">작성자: {""} </div>
                <div className="imagegame-button-container-container">
                    <div className="imagegame-button-container">
                        {mbtiButtonsA.map((value) => (
                            <button className = 'imagegame-vote-button' id={value.id} onClick = {() => handleVote(value.id)}>{value.id}</button>))}
                    </div>
                    <div className="imagegame-button-container">
                        {mbtiButtonsB.map((value) => (
                            <button className = 'imagegame-vote-button' id={value.id} onClick = {() => handleVote(value.id)}>{value.id}</button>))}
                    </div>
                </div>
        </div>
    );
}
export default ImageGamePage;