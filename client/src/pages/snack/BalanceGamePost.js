import React, { useEffect, useState, useRef, useCallback } from 'react';
import './BalanceGamePost.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import CommentUserInfoContainer from '../../components/user_info_container/CommentUserInfoContainer';
import { useAuth } from '../../auth/AuthContext';
import sendGetSingleBalanceGameRequest from '../../requests/GetSingleBalancegameRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import sendPostBalanceGameCommentRequest from '../../requests/PostBalanceGameCommentRequest';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';


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

const BalancePostContainer = ({ gameData, setGameData }) => {
    const { state } = useAuth();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [votes, setVotes] = useState({ left: 0, right: 0 });
    const [mbtiVotes, setMbtiVotes] = useState({});
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [isLoading, setIsLoading] = useState(true);
    const [myData, setMyData] = useState({data:{}});

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        sendGetMyinfoRequest(state, setMyData);
    }, []);

    const handleSend = () => {
        if(myData.data.mbti === 'NONE'){
            if(window.confirm('MBTI가 없어서 댓글을 등록할 수 없어요. 첫 테스트를 하러 가시겠어요?')){
                navigate('/mbti-test');
            }
        }
        sendPostBalanceGameCommentRequest(state, params.get('gameId'), inputValue, setInputValue, 
        () => sendGetSingleBalanceGameRequest(state, params.get('gameId'), setGameData, setIsLoading)
    );
    };

    const handleVote = (option) => {
        if (selectedOption === null) {
            setSelectedOption(option);
            setVotes((prevVotes) => ({
                ...prevVotes,
                [option]: prevVotes[option] + 1
            }));
            // MBTI 투표 로직 추가
            const userMbti = 'INTJ'; // 예시 MBTI, 실제로는 유저의 MBTI를 받아와야 함
            setMbtiVotes((prevMbtiVotes) => ({
                ...prevMbtiVotes,
                [userMbti]: (prevMbtiVotes[userMbti] || 0) + 1
            }));
        }
    };

    const totalVotes = votes.left + votes.right; //총 투표 수계산 (왼쪽 + 오른쪽 합)
    const leftPercentage = totalVotes ? (votes.left / totalVotes) * 100 : 0; //왼쪽 투표 비율
    const rightPercentage = totalVotes ? (votes.right / totalVotes) * 100 : 0; //오른쪽 투표 비율
    const mostVotedMbti = Object.keys(mbtiVotes).reduce((a, b) => 
        mbtiVotes[a] > mbtiVotes[b] ? a : b, ''); //가장 많이 선택한 MBTI 유형

    return (
        <div className="balance-post-container">
            <div className="balance-post-header">
                <div className="balance-post-title">{gameData.data.title}</div>
                <div className="balance-post-writer">{`작성자: ${gameData.nickName}`}</div>
            </div>

            <div className="balance-post-content">
                <button 
                    className={`balance-post-left ${selectedOption === 'left' ? 'selected' : ''} ${selectedOption === 'left' ? 'compressed' : ''} ${selectedOption !== null ? 'compressed' : ''}`} 
                    onClick={() => handleVote('left')}
                >
                    {gameData.data.leftOption}
                    {selectedOption && (
                        <div className="vote-details">
                            <div className="vote-percentage">{leftPercentage.toFixed(2)}%</div> 
                            <div className="vote-count">{votes.left}표</div> 
                            <div className="vote-mbti-title">가장 많이 선택한 MBTI</div>
                            <div className="vote-mbti">🏅{mostVotedMbti}</div>
                        </div>
                    )}
                </button>
                <button 
                    className={`balance-post-right ${selectedOption === 'right' ? 'selected' : ''} ${selectedOption === 'right' ? 'compressed' : ''} ${selectedOption !== null ? 'compressed' : ''}`} 
                    onClick={() => handleVote('right')}
                >
                    {gameData.data.rightOption}
                    {selectedOption && (
                        <div className="vote-details">
                            <div className="vote-percentage">{rightPercentage.toFixed(2)}%</div> 
                            <div className="vote-count">{votes.right}표</div> 
                            <div className="vote-mbti-title">가장 많이 선택한 MBTI</div>
                            <div className="vote-mbti">🏅{mostVotedMbti}</div>
                        </div>
                    )}
                </button>
            </div>

            <div className="balance-post-count">
                <div className="balance-post-heart-count-section">
                    <div className="balance-post-heart-img">❤️</div>
                    <div className="balance-post-heart-count">{gameData.data.heartCount}</div>
                </div>
                <div className="balance-post-comment-section">
                    <div className="balance-post-comment-img">💬</div>
                    <div className="balance-post-comment-count">{gameData.data.comments.length}</div>
                </div>
            </div>

            <div className="balance-comment-container">
                {gameData.data.comments.map((comment, index) => (
                    <div key={index} className="balance-comment-list">
                        <CommentUserInfoContainer />
                        <div className="balance-comment-section">
                            <div className="balance-comment-text">{comment.content}</div>
                            <div className="balance-comment-time">{comment.createdAt}</div>
                        </div>
                    </div>
                ))}
                <div className="balance-comment-input">
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleInputChange} 
                        placeholder="댓글을 입력하세요..."
                        className="balance-comment-input-field"
                    />
                    <div className="balance-comment-send-button" onClick={handleSend}>
                        <img src="public-img/send-img.png" alt="댓글 보내기" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const BalanceGamePost = () => {
    const { state } = useAuth();
    const [gameData, setGameData] = useState({data:{comments:[]}});
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        sendGetSingleBalanceGameRequest(state, params.get('gameId'), setGameData, setIsLoading);
    }, []);
    return (
        <div className="app">
          <AppContainerComponent />
          <HeaderComponent />
          <BalancePostContainer gameData={gameData} setGameData={setGameData}/>
        </div>
      );
};
  
export default BalanceGamePost;