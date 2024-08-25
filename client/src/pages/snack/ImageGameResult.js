import React, { useEffect, useState, useContext } from 'react';
import { VoteContext } from '../../context/VoteContext';
import mbtiData from '../../mbtiData/mbtiData';
import Badge from '../../components/badge/badge';
import './ImageGameResult.css';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import CommentUserInfoContainer from '../../components/user_info_container/CommentUserInfoContainer';
import { useNavigate } from 'react-router-dom';

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

const ImgResultContainer = () => {
    const { votes, removeVote } = useContext(VoteContext); // VoteContext에서 votes와 removeVote 가져오기
    const [title, setTitle] = useState('');
    const [voteCount, setVoteCount] = useState(0);
    const [topThree, setTopThree] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const totalVotes = Object.values(votes).reduce((acc, vote) => acc + vote, 0);
        setVoteCount(totalVotes);

        const votePercentages = Object.entries(votes).map(([mbti, vote]) => ({
            mbti,
            percentage: totalVotes ? (vote / totalVotes) * 100 : 0
        }));

        const sortedVotes = votePercentages
            // .map((percentage, index) => ({ index, percentage }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 3);

        setTopThree(sortedVotes);
    }, [votes]);

    const handleResetVote = () => {
        const votedMbti = localStorage.getItem('votedMbti');
        if (votedMbti) {
            removeVote(votedMbti);
            localStorage.removeItem('votedMbti');
        }
        localStorage.removeItem('voted');
        navigate('/imagegame-page');
    };

    return (
        <div className="img-game-result-container">
            <div className="img-game-result-title-section">
                <div className="img-game-result-title"> {title} MBTI를 제일 잘 믿을 것 같은 MBTI는? </div>
                <div className="img-game-result-title-writer"> 작성자 : 치와와 </div>
            </div>

            <div className="img-game-result-content-section">
                <div className="img-game-result-content-title"> 총 {voteCount}명이 투표했어요! </div>
                <div className="img-game-result-ranking">
                    {topThree.map((item, index) => {
                        let className;
                        if (index === 0) {
                            className = 'img-game-result-first';
                        } else if (index === 1) {
                            className = 'img-game-result-second';
                        } else if (index === 2) {
                            className = 'img-game-result-third';
                        }
                        return (
                            <div key={index} className={`img-game-result-item ${className}`}>
                                <Badge mbtiType={item.mbti} color={mbtiData[item.mbti].color} />
                                <div className="img-game-result-text">
                                    <div className="img-game-result-percentage">투표율: {item.percentage.toFixed(2)}%</div>
                                    <div className="img-game-result-index">
                                        {index === 0 && ' 압도적 1위를 달리는 중!'}
                                        {index === 1 && ' 콩콩콩! 2위!'}
                                        {index === 2 && ' 3위 방어중!'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="img-game-result-post-count">
                <div className="img-game-result-post-heart-count-section">
                    <div className="img-game-result-post-heart-img">❤️</div>
                    <div className="img-game-result-post-heart-count">100</div>
                </div>
                <div className="img-game-result-post-comment-section">
                    <div className="img-game-result-post-comment-img">💬</div>
                    <div className="img-game-result-post-comment-count">100</div>
                </div>
                <div className="img-game-reset-button-container">
                    <button className="img-game-reset-button" onClick={handleResetVote}>투표 초기화</button>
                </div>
            </div>
        </div>
    );
};

const CommentContainer = () => {
    
    const [comments, setComments] = useState([
        { text: '첫 번째 댓글입니다.', time: '2023-10-01 12:00:00' },
        { text: '두 번째 댓글입니다.', time: '2023-10-02 13:30:00' },
        { text: '세 번째 댓글입니다.', time: '2023-10-03 14:45:00' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 10;

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSend = () => {
        if (inputValue.trim() === '') return; // 빈 입력 방지
        setComments([...comments, { text: inputValue, time: new Date().toLocaleTimeString() }]);
        setInputValue('');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    return (
        <div className="img-game-result-comment-container">
            {currentComments.map((comment, index) => (
                <div key={index} className="img-game-result-comment-list">
                    <CommentUserInfoContainer />
                    <div className="img-game-result-comment-section">
                        <div className="img-game-result-comment-text">{comment.text}</div>
                        <div className="img-game-result-comment-time">{comment.time}</div>
                    </div>
                </div>
            ))}
            <div className="img-game-result-comment-input">
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    placeholder="댓글을 입력하세요..."
                    className="img-game-result-comment-input-field"
                />
                <div className="img-game-result-comment-send-button" onClick={handleSend}>
                    <img src="/public-img/send-img.png" alt="댓글 보내기" />
                </div>
            </div>
            <div className="img-game-result-comment-pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => handlePageChange(index + 1)}
                        className={`img-pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ImageGameResult = () => {  
    return (
        <div className="app">
          <AppContainerComponent />
          <HeaderComponent />
          <ImgResultContainer />
          <CommentContainer />
        </div>
      );
};
  
export default ImageGameResult;