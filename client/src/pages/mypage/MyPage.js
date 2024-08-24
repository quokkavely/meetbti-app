import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';
import getMyInfo from '../../requests/GetMyInfo';

// 컴포넌트 임포트
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
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

// 마이페이지 유저 정보 컴포넌트
const MyPageUserInfoContainer = (props) => {
    return (
        <div className="mypage-user-info-container">
            <div className="mypage-user-info-container-inner">
                <img src="/public-img/catprofile.png" alt="mypage-user-info-img" />
            </div>
            <div className="mypage-user-info-section">
                <div className="mypage-user-info-section-badge"> {props.mbti} </div>
                <div className="mypage-user-info-section-name"> {props.nickname} </div>
            </div>
        </div>
    );
};


// 마이페이지 유저 정보 버튼 컴포넌트
const MyPageUserInfoButton = () => {
    const navigate = useNavigate();
    return (
        <div className="mypage-user-info-button-container">
            <button className="mypage-user-info-modify-button" onClick={() => navigate('/mypagemodify')}>
                <img src="/public-img/profile.png" alt="mypage-user-info-modify-button"/> 내 정보 수정
            </button>
            <button className="mypage-user-info-history-button" onClick={() => navigate('/mypagehistory')}>
                <img src="/public-img/profile.png" alt="mypage-user-info-history-button"/> 내 활동 내역
            </button>
        </div>
    );
}

// 마이페이지 내 MBTI 버튼 컴포넌트
const MyPageMyMBTIButton = () => {
    const navigate = useNavigate();
    return (
        <div className="mypage-my-mbti-button-container">
            <button className="mypage-my-mbti-button" onClick={() => navigate('/mbtiboard')}> My MBTI </button>
        </div>
    );
}


// 마이페이지 새 공지사항 컴포넌트
const NewNotice = () => {
    return (
        <div className="mypage-new-notice-container">
            <div className="mypage-new-notice-container-title"> 새로운 소식 </div>
            <div className="mypage-new-notice-container-banner">
                <img src="/public-img/banner-img.png" alt="notice-banner"/>
            </div>
        </div>
    );
}


const MyPage = () => {
    const { state } = useAuth();
    const [myData, setMyData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyInfo(state, setMyData, setLoading);
    }, [])

    return (
    <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        {!loading && <MyPageUserInfoContainer profileImg={myData.data.image} mbti={myData.data.mbti} nickname={myData.data.nickname}/>}
        <MyPageUserInfoButton />
        <MyPageMyMBTIButton />
        <NewNotice />
    </div>
    );
};
  
  export default MyPage;