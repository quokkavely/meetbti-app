import React, { useEffect, useState, useRef, useCallback } from 'react';
import './BalanceGamePost.css';

import AppContainer from '../components/AppContainer';
import Header from '../components/Header';
import CommentUserInfoContainer from '../components/CommentUserInfoContainer';


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

const BalancePostContainer = () => {
    const [inputValue, setInputValue] = useState('');
    const [comments, setComments] = useState([
        { text: '첫 번째 댓글입니다.', time: '2023-10-01 12:00:00' },
        { text: '두 번째 댓글입니다.', time: '2023-10-02 13:30:00' },
        { text: '세 번째 댓글입니다.', time: '2023-10-03 14:45:00' }
    ]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [votes, setVotes] = useState({ left: 0, right: 0 });
    const [mbtiVotes, setMbtiVotes] = useState({});

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSend = () => {
        if (inputValue.trim()) {
            const currentTime = new Date().toISOString().replace('T', ' ').split('.')[0];
            setComments([...comments, { text: inputValue, time: currentTime }]);
            setInputValue('');
        }
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
                <div className="balance-post-title">Q. 일 할래?, 놀래?</div>
                <div className="balance-post-writer">작성자 : 치와와</div>
            </div>

            <div className="balance-post-content">
                <button 
                    className={`balance-post-left ${selectedOption === 'left' ? 'selected' : ''} ${selectedOption === 'left' ? 'compressed' : ''} ${selectedOption !== null ? 'compressed' : ''}`} 
                    onClick={() => handleVote('left')}
                >
                    월 500 받고 매일 야근하기
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
                    월 100 받고 백수생활 하기
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
                    <div className="balance-post-heart-count">100</div>
                </div>
                <div className="balance-post-comment-section">
                    <div className="balance-post-comment-img">💬</div>
                    <div className="balance-post-comment-count">100</div>
                </div>
            </div>

            <div className="balance-comment-container">
                {comments.map((comment, index) => (
                    <div key={index} className="balance-comment-list">
                        <CommentUserInfoContainer />
                        <div className="balance-comment-section">
                            <div className="balance-comment-text">{comment.text}</div>
                            <div className="balance-comment-time">{comment.time}</div>
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
                        <img src="send-img.png" alt="댓글 보내기" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const BalanceGamePost = () => {
    return (
        <div className="app">
          <AppContainerComponent />
          <HeaderComponent />
          <BalancePostContainer />
        </div>
      );
};
  
export default BalanceGamePost;