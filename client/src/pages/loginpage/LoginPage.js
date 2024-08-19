import MobileHeader from "../../components/MobileHeader.js";
import { Link } from "react-router-dom";
import './LoginPage.css';

function InputContainer(){
    return (
        <div className="input-container">
            <textarea placeholder="이메일을 입력해 주세요" className="login-input"></textarea>
            <textarea placeholder="비밀번호를 입력해 주세요" className="login-input"></textarea>
            <button className="login-button">로그인</button>
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
        <MobileHeader></MobileHeader>
        <div className="logo-section">
        <img src="Main-logo.png" className="logo"></img></div>
        <InputContainer></InputContainer>
        <FindPasswordContainer></FindPasswordContainer>
        <h2 className="or">ㅡㅡㅡㅡㅡㅡㅡ 또는 ㅡㅡㅡㅡㅡㅡㅡ</h2>
        <OAuthContainer></OAuthContainer>
        <h2 className="right">MeetBTI All Rights Reserved</h2>
      </div>
    );
  };
export default LoginPage;