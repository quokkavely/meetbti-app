import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyMBTIHistory.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import { useNavigate } from 'react-router-dom';
import sendMbtiTestResultsRequest from '../../requests/MbtiTestResultsRequest';
import { useAuth } from '../../auth/AuthContext';


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
    const observer = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        sendMbtiTestResultsRequest(state, 1, 8, setLoading, setHistoryData);
    }, []);

    const dummyData = [
        { mbti: 'INTJ', date: '2023-01-01 12:00' },
        { mbti: 'ENTP', date: '2023-01-02 13:00' },
        { mbti: 'INFJ', date: '2023-01-03 14:00' },
        { mbti: 'ENFP', date: '2023-01-04 15:00' },
        { mbti: 'ISTJ', date: '2023-01-05 16:00' },
        { mbti: 'ISFP', date: '2023-01-06 17:00' },
        { mbti: 'ISFP', date: '2023-01-06 17:00' },
        { mbti: 'ISFP', date: '2023-01-06 17:00' },
    ];

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
                        {index === historyData.data.length - 1 && <div className='latest-mark'>LATEST</div>}
                    </div>
                </div>
            ))}
            {(historyData.data.length === 0) && <NoContentContainer></NoContentContainer>}
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