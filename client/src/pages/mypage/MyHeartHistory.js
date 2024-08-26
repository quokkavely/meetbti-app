import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyHeartHistory.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetMyHeartsRequest from '../../requests/GetMyHeartsRequest';
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

const HeartHistoryTitle = () => {
    return (
        <div className="heart-history-title" >
            <img src="public-img/heart-red-img.png" alt="history-item"/>
            내 좋아요 목록
        </div>
    );
};

const Historyrecenttext = () => {
    return (
        <div className="history-recenttext">
            최근 좋아요 순
        </div>
    );
};

const HistorySection = () => {
    const [type, setType] = useState('POST');
    const [page, setPage] = useState(1);
    const [myHearts, setMyHearts] = useState({data:[]});
    const { state } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        sendGetMyHeartsRequest(state, page, 9999, type, setMyHearts, setIsLoading);
    }, [type]);
    const handleDropdownChange = (event) => {
        setType(event.target.value);
    }

    return (
        <div className="history-section">
            <select className='select-type' value={type} onChange={handleDropdownChange}>
                <option value='' disabled>종류 선택</option>
                <option value='POST'>게시글</option>
                <option value='BALANCE_GAME'>밸런스게임</option>
                <option value='IMAGE_GAME'>이미지게임</option>
            </select>
            
            {myHearts.data.length === 0 ? <div>좋아요 이력이 없어요</div> : myHearts.data.map((item, index) => (
                <div
                    className={`history-section-content ${index % 2 === 0 ? 'white-background' : 'gray-background'}`}
                    /* onClick={navigate(`postpage?postId`)} */
                >
                    <div className="history-content-text">{item.title}</div>
                    <div className="history-content-date">{item.date}</div>
                </div>
            ))}
        </div>
    );
};


const MyHeartHistory = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <HeartHistoryTitle />
        <Historyrecenttext />
        <HistorySection />
      </div>
    );
  };

export default MyHeartHistory;