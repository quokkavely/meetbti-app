import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyMBTIHistory.css';

import AppContainer from '../components/AppContainer';
import Header from '../components/Header';


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
            <img src="history-img.png" alt="history-item"/>
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
    const [historyData, setHistoryData] = useState([]);
    const [page, setPage] = useState(1);
    const observer = useRef();

    const fetchHistoryData = useCallback(async () => {
        // 데이터를 가져오는 API 호출
        const response = await fetch(`/api/history?page=${page}`);
        const data = await response.json();
        setHistoryData(prevData => [...prevData, ...data]);
    }, [page]);

    useEffect(() => {
        fetchHistoryData();
    }, [fetchHistoryData]);

    const lastHistoryElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
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

    const displayData = historyData.length > 0 ? historyData : dummyData;

    return (
        <div className="history-section">
            {displayData.map((item, index) => (
                <div
                    className={`history-section-content ${index % 2 === 0 ? 'white-background' : 'gray-background'}`}
                    key={index}
                    ref={index === displayData.length - 1 ? lastHistoryElementRef : null}
                >
                    <div className="history-content-text">{item.mbti}</div>
                    <div className="history-content-date">{item.date}</div>
                </div>
            ))}
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