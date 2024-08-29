import React, { useEffect, useState, useRef, useCallback } from 'react';
import './MyHeartHistory.css';

import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendGetMyHeartsRequest from '../../requests/GetMyHeartsRequest';
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

const HeartHistoryTitle = () => {
    return (
        <div className="heart-history-title" >
            <img src="public-img/heart-red-img.png" alt="history-item"/>
            내 좋아요 목록
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
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [displayedType, setDisplayedType] = useState('게시글');

    useEffect(() => {
        sendGetMyHeartsRequest(state, page, 6, type, setMyHearts, setIsLoading);
    }, [displayedType]);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const selectType = (option) => {
        switch(option){
            case '게시글':
                setType('POST'); 
                break;
            case '이미지게임':
                setType('IMAGE_GAME');
                break;
            case '밸런스게임':
                setType('BALANCE_GAME');
                break;
        }
        setDisplayedType(option);
        setDropdownOpen(false);
    };

    return (
        <div className="history-section">
            <div className="dropdown-heart" ref={dropdownRef}>
                <button className="filter-btn-heart" onClick={toggleDropdown}>{`▼ ${displayedType}`}</button>
                {isDropdownOpen && (
                    <div className="dropdown-menu-heart">
                        <button className="dropdown-item-heart" onClick={() => selectType('게시글')}>게시글</button>
                        <button className="dropdown-item-heart" onClick={() => selectType('밸런스게임')}>밸런스게임</button>
                        <button className="dropdown-item-heart" onClick={() => selectType('이미지게임')}>이미지게임</button>
                    </div>
                )}
            </div>
            <div className='histories-container'>
                {myHearts.data.length === 0 ? <div>좋아요 이력이 없어요</div> : myHearts.data.map((item, index) => (
                    <div
                        className={`history-section-content ${index % 2 === 0 ? 'white-background' : 'gray-background'}`}
                        /* onClick={() => navigate(`postpage?postId`)} */
                    >
                        <div className="history-content-text">{type === "IMAGE_GAME" ? item.topic : item.title}</div>
                        <div className="history-content-date">{item.createdAt}</div>
                    </div>
                ))}
            </div>
            {myHearts.data.length === 0 ? <div></div> : 
            <PageContainer
                currentPage={page} pageInfo={myHearts.pageInfo}
                getPage={(page) => sendGetMyHeartsRequest(state, page, 6, type, setMyHearts, setIsLoading)}
            >
            </PageContainer>}
        </div>
    );
};


const MyHeartHistory = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <HeartHistoryTitle />
        <HistorySection />
      </div>
    );
  };

export default MyHeartHistory;