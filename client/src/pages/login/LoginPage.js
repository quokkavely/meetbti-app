import { Link } from "react-router-dom";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from "../../auth/AuthContext";
import sendLoginRequest from "../../requests/LoginRequest";
import ModalCheck from '../../components/modal/ModalCheck';
import sendGetOAuthTokenRequest from "../../requests/GetOAuthTokenRequest";

// 헤더(로고, 뒤로가기) 컴포넌트
const Header = () => {
    const navigate = useNavigate();
    return (
      <header className="login-header">
        <div className="login-logo-box">
          <div className="login-back-icon" onClick={() => navigate(-1)}>
            <img src="/public-img/back(grey).png" alt='뒤로 가기' />
          </div>
        </div>
      </header>
    );
  };
  

function InputContainer(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('로그인에 실패했어요');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleBlur = () => {
        if (!email) {
            setEmailError('이메일 빈칸은 허용되지 않습니다');
        } else {
            setEmailError('');
        }
        if (!password) {
            setPasswordError('비밀번호 빈칸은 허용되지 않습니다');
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = () => {
        if (!email) {
            setEmailError('이메일 빈칸은 허용되지 않습니다');
        } else {
            setEmailError('');
        }
        if (!password) {
            setPasswordError('비밀번호 빈칸은 허용되지 않습니다');
        } else {
            setPasswordError('');
            // 로그인 로직 추가
            /* requestLogin(email, password); */
            sendLoginRequest(email, password, login, navigate, (errorMessage) => {
                setErrorModalOpen(true);
                setLoginErrorMessage(errorMessage);
            });
        }
    };
    

    return (
        <div className="input-container">
            <input 
                placeholder="이메일을 입력해 주세요" 
                className="login-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur} // 포커스가 벗어날 때 에러 체크
            />
            {emailError && <div className="error-message">{emailError}</div>}
            <input 
                placeholder="비밀번호를 입력해 주세요" 
                className="login-input" 
                type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur} // 포커스가 벗어날 때 에러 체크
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
            <button className="login-button" onClick={handleLogin}>로그인</button>
            {isErrorModalOpen && <ModalCheck message={loginErrorMessage} onClose={() => setErrorModalOpen(false)}></ModalCheck>}
        </div>
    );
}
function FindPasswordContainer(){
    return (
        <div className="find-password">
            <button className="find-password-button">비밀번호 찾기</button>
            <Link to='/registration'>
                <button className="find-password-button">회원가입</button>
            </Link>
        </div>
    );
}
function OAuthContainer({ navigate }){
    return (
        <div className="oauth-container">
            {/* <img src="/public-img/google.png" className="oauth-logo" onClick={() => window.open(`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`)}></img> */}
            <img src="/public-img/google.png" className="oauth-logo" onClick={() => sendGetOAuthTokenRequest()}></img>
            <img src="/public-img/kakao.png" className="oauth-logo"></img>
            <img src="/public-img/naver.png" className="oauth-logo"></img>
        </div>
    );
}
const LoginPage = () => {
    const navigate = useNavigate();
    return (
      <div className="app">
        <Header></Header>
        <div className="logo-section">
        <img src="/public-img/Main-logo.png" className="logo"></img></div>
        <InputContainer></InputContainer>
        <FindPasswordContainer></FindPasswordContainer>
        <h2 className="or"> 또는 </h2>
        <OAuthContainer navigate = {navigate}></OAuthContainer>
        <h2 className="right">MeetBTI all rights reserved</h2>
      </div>
    );
  };
export default LoginPage;