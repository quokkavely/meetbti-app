import React, { useEffect, useState, useContext } from 'react';
import { VoteContext } from '../../context/VoteContext';
import mbtiData from '../../mbtiData/mbtiData';
import Badge from '../../components/badge/badge';
import { useLocation } from 'react-router-dom';
import './ImageGameResult.css';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import CommentUserInfoContainer from '../../components/user_info_container/CommentUserInfoContainer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';
import sendImageGameCommentRequest from '../../requests/ImageGameCommentRequest';
import sendGetSingleImageGameRequest from '../../requests/GetSingleImageGameRequest';
import sendPostHeartRequest from '../../requests/PostHeartRequest';

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

const ImgResultContainer = ({ gameData, setGameData }) => {
    const { votes, removeVote } = useContext(VoteContext);
    const [title, setTitle] = useState('');
    const [voteCount, setVoteCount] = useState(0);
    const [topThree, setTopThree] = useState([]);
    const navigate = useNavigate();
    const { state } = useAuth();
    const [HeartCount, setHeartCount] = useState(0);
    const [CommentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [myData, setMyData] = useState({ data: {} });
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 10;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const totalPages = Math.ceil(comments.length / commentsPerPage);

    useEffect(() => {
        sendGetMyinfoRequest(state, setMyData);
    }, [state]);

    useEffect(() => {
        if (gameData.data.comments) {
            setComments(gameData.data.comments);
        }
    }, [gameData]);

    const [gameId, setGameId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('gameId');
        setGameId(id);
        if (id) {
            sendGetSingleImageGameRequest(state, id, setGameData, setIsLoading);
        }
    }, [location.search, state]);

    const handleSend = () => {
        if (myData.data.mbti === 'NONE') {
            if (window.confirm('MBTI가 없어서 댓글을 등록할 수 없어요. 첫 테스트를 하러 가시겠어요?')) {
                navigate('/mbti-test');
                return;
            }
        }
        sendImageGameCommentRequest(state, gameId, inputValue, setInputValue,
            () => sendGetSingleImageGameRequest(state, gameId, setGameData, setIsLoading));
    };

    useEffect(() => {
        const totalVotes = Object.values(votes).reduce((acc, vote) => acc + vote, 0);
        setVoteCount(totalVotes);

        const votePercentages = Object.entries(votes).map(([mbti, vote]) => ({
            mbti,
            percentage: totalVotes ? (vote / totalVotes) * 100 : 0
        }));

        const sortedVotes = votePercentages
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="img-game-result-container">
            <div className="img-game-result-title-section">
                <div className="img-game-result-title"> {title} </div>
                <div className="img-game-result-title-writer"> 작성자 : {state.nickName} </div>
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
                                        {index === 2 && ' 아슬아슬 3위 방어중!'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* 좋아요, 댓글 수 */}
            <div className="img-game-result-post-count">
                <div className="img-game-result-post-heart-count-section" onClick={() => sendPostHeartRequest(state, gameId, 'imagegames',
                    () => sendGetSingleImageGameRequest(state, gameId, setGameData, setIsLoading)
                )}>
                    <div className="img-game-result-post-heart-img">❤️</div>
                    <div className="img-game-result-post-heart-count">{gameData.data.heartCount}</div>
                </div>
                <div className="img-game-result-post-comment-section">
                    <div className="img-game-result-post-comment-img">💬</div>
                    <div className="img-game-result-post-comment-count">{gameData.data.commentCount}</div>
                </div>
                <div className="img-game-reset-button-container">
                    <button className="img-game-reset-button" onClick={handleResetVote}>투표 초기화</button>
                </div>
            </div>

            <div className="img-game-result-comment-container">
                {gameData.data.comments.map((comment, index) => (
                    <div key={index} className="img-game-result-comment-list">
                        <CommentUserInfoContainer />
                        <div className="img-game-result-comment-section">
                            <div className="img-game-result-comment-text">{comment.content}</div>
                            <div className="img-game-result-comment-time">{comment.createdAt}</div>
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
                {/* <div className="img-game-result-comment-pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`img-pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div> */}
            </div>
        </div>
    );
};

const ImageGameResult = () => {
    const [gameData, setGameData] = useState({ data: { comments: [] } });
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const { state } = useAuth(); // useAuth 훅을 사용하여 state를 가져옴
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const gameId = params.get('gameId');
        if (gameId) {
            sendGetSingleImageGameRequest(state, gameId, setGameData, setIsLoading);
        }
    }, [location.search, state]);

    return (
        <div className="app">
            <AppContainerComponent />
            <HeaderComponent />
            <ImgResultContainer gameData={gameData} setGameData={setGameData} />
        </div>
    );
};

export default ImageGameResult;