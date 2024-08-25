import React, { useContext, useEffect, useState } from 'react';
import Header from "../../components/basic_css/Header";
import './ImageGamePage.css';
import { VoteContext } from '../../context/VoteContext';
import { useNavigate, useParams } from 'react-router-dom';

const mbtiButtonsA = [{id:'ENFP'}, {id:'ESFJ'}, {id:'ISFP'}, {id:'ESFP'}, {id:'ESTP'}, {id:'ISTJ'}, {id:'INTJ'}, {id:'ENTP'}];
const mbtiButtonsB = [{id:'ENFJ'}, {id:'INFP'}, {id:'INFJ'}, {id:'ISFJ'}, {id:'ESTJ'}, {id:'ENTJ'}, {id:'ISTP'}, {id:'INTP'}];

function MbtiButton(props){
    const { addVote } = useContext(VoteContext);
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [isVoted, setIsVoted] = useState(false);

    useEffect(() => {
        const votedGames = JSON.parse(localStorage.getItem('votedGames')) || [];
        if (votedGames.includes(gameId)) {
            setIsVoted(true);
        }
    }, [gameId]);

    const handleClick = () => {
        addVote(props.name);
        localStorage.setItem('voted', 'true');
        localStorage.setItem('votedMbti', props.name);
        navigate('/imagegame-result');
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

const ImageGamePage = () => {
    return (
        <div className="app">
            <Header></Header>
            <h2 className="imagegame-title">MBTI를 가장 잘 믿을 것 같은 MBTI는?</h2>
            <div className="imagegame-author">작성자: 치와와</div>
            <div className="imagegame-button-container-container">
                <div className="imagegame-button-container">
                    {mbtiButtonsA.map((value) => <MbtiButton key={value.id} name={value.id}></MbtiButton>)}
                </div>
                <div className="imagegame-button-container">
                    {mbtiButtonsB.map((value) => <MbtiButton key={value.id} name={value.id}></MbtiButton>)}
                </div>
            </div>
        </div>
    );
}
export default ImageGamePage;