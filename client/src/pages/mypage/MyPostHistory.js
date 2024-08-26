import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyPostHistory.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetPostsRequest from '../../requests/GetPostsRequest';
import { useAuth } from '../../auth/AuthContext';
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

const MBTIHistoryTitle = () => {
    return (
        <div className="post-history-title" >
            <img src="public-img/post-img.png" alt="history-item"/>
            내 작성글
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
    const [historyData, setHistoryData] = useState({data:[]});
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    /* const displayData = historyData.length > 0 ? historyData : dummyData; */

    const NoContent = () => {
        return (
            <div className='no-content white-background'>
                <div>작성한 게시글이 없어요</div>
            </div>
        );
    }

    useEffect(() => {
        sendGetPostsRequest(state, 1, 99999, '', 'createdAt', setIsLoading, setHistoryData);
    }, []);

    return (
        <div className="history-section">
            {historyData.data.length !== 0 ? historyData.data.map((item, index) => (
                <div
                    className={`history-section-content ${index % 2 === 0 ? 'white-background' : 'gray-background'}`}
                    onClick={() => navigate(`/postpage?postId=${item.postId}`)}
                >
                    <div className="history-content-text">{item.title}</div>
                    <div className="history-content-date">{item.createdAt}</div>
                </div>
            )) : <NoContent></NoContent>}
        </div>
    );
};


const MyPostHistory = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <MBTIHistoryTitle />
        <Historyrecenttext />
        <HistorySection />
      </div>
    );
  };

export default MyPostHistory;