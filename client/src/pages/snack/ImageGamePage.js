import React, { useContext, useEffect, useState } from 'react';
import Header from "../../components/basic_css/Header";
import './ImageGamePage.css';
import { VoteContext } from '../../context/VoteContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import sendGetSingleImageGameRequest from '../../requests/GetSingleImageGameRequest';

const mbtiButtonsA = [{id:'ENFP'}, {id:'ESFJ'}, {id:'ISFP'}, {id:'ESFP'}, {id:'ESTP'}, {id:'ISTJ'}, {id:'INTJ'}, {id:'ENTP'}];
const mbtiButtonsB = [{id:'ENFJ'}, {id:'INFP'}, {id:'INFJ'}, {id:'ISFJ'}, {id:'ESTJ'}, {id:'ENTJ'}, {id:'ISTP'}, {id:'INTP'}];

function MbtiButton(props){
    const { addVote } = useContext(VoteContext);
    const { state } = useAuth(); // 인증 상태를 가져옴
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [isVoted, setIsVoted] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        const votedGames = JSON.parse(localStorage.getItem('votedGames')) || [];  // 로컬 스토리지에서 투표한 게임 목록을 가져옴
        if (votedGames.includes(gameId)) {
            setIsVoted(true);  // 이미 투표한 게임이면 버튼을 비활성화
        }
    }, [gameId]); // gameId가 변경될 때마다 useEffect 실행

    const handleClick = () => {
        if (!state.isAuthenticated) {
            alert('로그인이 필요합니다.'); // 로그인 필요 메시지
            navigate('/login'); // 로그인 페이지로 이동
            return;
        }
        addVote(props.name); // 투표 기능 호출
        const votedGames = JSON.parse(localStorage.getItem('votedGames')) || [];
        votedGames.push(gameId) // 투표한 게임 목록에 현재 게임 추가
        localStorage.setItem('votedGames', JSON.stringify(votedGames)); // 로컬 스토리지에 투표한 게임 목록 저장
        localStorage.setItem('votedMbti', props.name); // 로컬 스토리지에 투표한 MBTI 저장
        navigate(`/imagegame-result?gameId=${params.get("gameId")}`); // 결과 페이지로 이동
    };

    return (
        <button 
            className="imagegame-vote-button" 
            id={props.name} 
            onClick={handleClick} 
            disabled={isVoted} // 이미 투표한 경우 버튼 비활성화
        >
            {props.name}
        </button>
    );
}

const ImageGamePage = ( ) => {
    const { state } = useAuth(); // 인증 상태를 가져옴
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const gameId = params.get("gameId");
    const [imageGameData, setImageGameData] = useState({data:{}}); // 초기값 빈 객체
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //서버에서 가져오는 부분
    useEffect(() => {
        sendGetSingleImageGameRequest(state, gameId, setImageGameData, setLoading, navigate);
    }, []);

    return (
        <div className="app">
            <Header></Header>
            {loading ? <div /> : <div className="imagegame-title">{imageGameData.data.topic}</div>}
            {/* {!loading && <h2 className="imagegame-title">{imageGameData.data.topic}</h2>} */}
            <div className="imagegame-author">작성자: {""} </div>
            <div className="imagegame-button-container-container">
                <div className="imagegame-button-container">
                    {mbtiButtonsA.map((value) => (
                        <MbtiButton key={value.id} name={value.id}></MbtiButton>))}
                </div>
                <div className="imagegame-button-container">
                    {mbtiButtonsB.map((value) => (
                        <MbtiButton key={value.id} name={value.id}></MbtiButton>))}
                </div>
            </div>
        </div>
    );
}
export default ImageGamePage;