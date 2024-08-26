import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from "../../components/basic_css/Header";
import './ImageGameRegistration.css';
import sendGetSinglePostsRequest from '../../requests/GetSinglePostRequest';
import sendPostImageGameRequest from '../../requests/PostImageGameRequest';


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

const RegistImageGame = () => {
    return (
        <div className="content-input">
            <div className="content-input-textarea">
                # 논란의 소지가 있는 게시물은 삭제될 수 있습니다.<br />
                # 게시물은 신고 여부에 따라 삭제될 수 있습니다.
            </div>
        </div>
    );
};

const RegistTitle = ({ title, setTitle }) => {
    return (
        <div className="title-input">
            <textarea 
            className="title-input-textarea"
            placeholder="이미지 게임 제목을 입력해 주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ></textarea>
        </div>
    );
};

const submitImageGame = (title, state, navigate) => {
    console.log('submitImageGame 호출됨'); // 디버깅용 로그
    if (title === '') {
        alert('제목을 입력해주세요');
        return;
    }
    if (window.confirm('게시글을 등록하시겠어요?')) {
        sendPostImageGameRequest(state, title, navigate); // title을 전달
        return;
    }
};

const RegistButton = ({ state, navigate, title, params }) => {
    console.log('RegistButton 렌더링됨'); // 디버깅용 로그
    return (
        <div className="game-registration-button-container">
            <button className="game-registration-button" 
            onClick={() => submitImageGame(title, state, navigate, params)}>등록</button>
        </div>
    );
}

const ImageGameRegistration = () => {
    const { login, state } = useAuth();
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.get('action') === 'modify') {
            sendGetSinglePostsRequest(state, params.get('postId'), setLoading,
            (data) => {
                console.log('게시글 정보 적용중...');
                setTitle(data.data.title); 
            }, undefined);
        }
    }, [params, state]);

    const handleSubmit = () => {
        // 게시글 등록 로직 추가
        const postData = {
            title
        };
        console.log('게시글 등록:', postData);
        // 등록 후 페이지 이동
        navigate('/imagegame');
    };

    return (
        <div className="app">
            <AppContainerComponent />
            <HeaderComponent />
            <RegistImageGame />
            <RegistTitle title={title} setTitle={setTitle} />
            <RegistButton state={state} navigate={navigate} title={title} params={params} />
        </div>
    );
};

export default ImageGameRegistration;