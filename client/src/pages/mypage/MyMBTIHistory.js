import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyMBTIHistory.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import { useNavigate } from 'react-router-dom';
import sendMbtiTestResultsRequest from '../../requests/MbtiTestResultsRequest';
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

const MBTIHistoryTitle = () => {
    return (
        <div className="mbti-history-title" >
            <img src="public-img/history-img.png" alt="history-item"/>
            내 MBTI 기록
        </div>
    );
};

const Historyrecenttext = () => {
    return (
        <div className="history-recenttext">
            최신 변경 순
        </div>
    );
};

const HistorySection = () => {
    const { state } = useAuth();
    const [historyData, setHistoryData] = useState({data:[]});
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        sendMbtiTestResultsRequest(state, 1, 8, setLoading, setHistoryData);
    }, []);

    const NoContentContainer = () => {
        return (
            <div className='no-content'>
                <img src='public-img/catprofile.png' className='no-content-img'></img>
                <div className='no-content-text'>아직 MBTI 테스트 기록이 없어요</div>
                <button className='goto-test' onClick={() => navigate('/mbti-test')}>테스트 하러가기</button>
            </div>
        );
    }

    return (
        <div className="history-section">
            <div className='histories-container'>
                {historyData.data.map((item, index) => (
                    <div
                        className={`history-section-content ${index % 2 === 0 ? 'white-background' : 'gray-background'}`}
                        key={index}
                    >
                        <div className='history-content-container-container'>
                            <div className='history-content-container'>
                                <div className="history-content-text">{item.mbti}</div>
                                <div className="history-content-date">{item.createdAt}</div>
                            </div>
                            {index + (historyData.pageInfo.page-1) * historyData.pageInfo.size === historyData.pageInfo.totalElements - 1 && <div className='latest-mark'>LATEST</div>}
                        </div>
                    </div>
                ))}
            </div>
            {(historyData.data.length === 0) && <NoContentContainer></NoContentContainer>}
            {historyData.data.length === 0 ? <div></div> : <PageContainer currentPage = {page} pageInfo = {historyData.pageInfo}
             getPage = {(page) => sendMbtiTestResultsRequest(state, page, 6, setLoading, setHistoryData)}></PageContainer>}
        </div>
    );
};


const MyMBTIHistory = () => {
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

export default MyMBTIHistory;