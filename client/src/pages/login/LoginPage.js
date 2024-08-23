import { Link } from "react-router-dom";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { useAuth } from "../../auth/AuthContext";

// 헤더(로고, 뒤로가기) 컴포넌트
const Header = () => {
    const navigate = useNavigate();
    return (
      <header className="login-header">
        <div className="login-logo-box">
          <div className="login-back-icon" onClick={() => navigate(-1)}>
            <img src="back(grey).png" alt='뒤로 가기' />
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
            requestLogin(email, password);
        }
    };

    const requestLogin = async() => {
        try{
            const response = await fetch('http://localhost:8080/login',
                {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password
                    }),
                }
                
            );
            if(response.ok){
                console.log('로그인 성공');
                const token = response.headers.get('Authorization');
                console.log('token: ' + token);

                login(token, {email});
                navigate('/');
            }else{
                console.log('로그인 실패: ', response.status);
            }
        } catch (error){
            console.error('로그인 실패', error);
        }
    }

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
function OAuthContainer(){
    return (
        <div className="oauth-container">
            <img src="google.png" className="oauth-logo"></img>
            <img src="kakao.png" className="oauth-logo"></img>
            <img src="naver.png" className="oauth-logo"></img>
        </div>
    );
}
const LoginPage = () => {
    return (
      <div className="app">
        <Header></Header>
        <div className="logo-section">
        <img src="Main-logo.png" className="logo"></img></div>
        <InputContainer></InputContainer>
        <FindPasswordContainer></FindPasswordContainer>
        <h2 className="or"> 또는 </h2>
        <OAuthContainer></OAuthContainer>
        <h2 className="right">MeetBTI all rights reserved</h2>
      </div>
    );
  };
export default LoginPage;