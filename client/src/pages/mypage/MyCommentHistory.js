import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyCommentHistory.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetMyCommentsRequest from '../../requests/GetMyCommentsRequest';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
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

const CommentHistoryTitle = () => {
    return (
        <div className="comment-history-title" >
            <img src="public-img/comment-img.png" alt="history-item"/>
            내가 쓴 댓글
        </div>
    );
};

const Historyrecenttext = () => {
    return (
        <div className="history-recenttext">
            최신 작성 순
        </div>
    );
};

const HistorySection = () => {
    const { state } = useAuth();
    const [page, setPage] = useState(1);
    const [myComments, setMyComments] = useState({data:[]});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        sendGetMyCommentsRequest(state, page, 6, setMyComments, setIsLoading);
    }, []);


    return (
        <div className="history-section">
            <div className='histories-container'>
                {myComments.data.length === 0 ? <div>작성한 댓글이 없어요.</div> : myComments.data.map((item, index) => (
                    <div
                        className={`history-section-content ${index % 2 === 0 ? 'white-background' : 'gray-background'}`}
                        onClick={() => navigate(`/postpage?postId=${item.postId}`)}
                    >
                        <div className="history-content-text">{item.content}</div>
                        <div className="history-content-date">{item.date}</div>
                    </div>
                ))}
            </div>
            {myComments.data.length === 0 ? <div></div> : 
            <PageContainer
                currentPage={page} pageInfo={myComments.pageInfo}
                getPage={(page) => sendGetMyCommentsRequest(state, page, 6, setMyComments, setIsLoading)}
            ></PageContainer>}
        </div>
    );
};


const MyCommentHistory = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <CommentHistoryTitle />
        <Historyrecenttext />
        <HistorySection />
      </div>
    );
  };

export default MyCommentHistory;