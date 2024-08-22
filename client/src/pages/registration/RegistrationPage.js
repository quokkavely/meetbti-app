import './RegistrationPage.css';
import Header from '../../components/Header.js';
import { useState } from 'react';

function WelcomeText(){
    return (
        <div className="welcome-text">
            <h2>만나서 반가워요</h2>
            <h2>회원가입을 진행할게요</h2>
        </div>
    );
}
function RegisterInput(props){
    return (
        <div className="register-input-container">
            <h2 className="register-input-title">{props.title}</h2>
            <textarea className='register-input' placeholder={props.placeholder}
             onChange={(e) => props.setState(e.target.value)}></textarea>
            <button className="register-dupl-button">중복 확인</button>
        </div>
    );
}
function PasswordInput(props){
    return (
        <div className="register-input-container">
            <h2 className="register-input-title">비밀번호</h2>
            <textarea className='register-input' placeholder='비밀번호를 입력해주세요'
             onChange={(e) => props.setState(e.target.value)}></textarea>
            <textarea className='password-input' placeholder='비밀번호를 입력해주세요'
             onChange={(e) => props.setState2(e.target.value)}></textarea>
        </div>
    );
}



const RegistrationPage = () => {
    const [emailInput, setEmailInput] = useState('');
    const [nicknameInput, setNicknameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordCheckInput, setPasswordCheckInput] = useState('');

    const registration = async () => {
        /* console.log('Email:'+ emailInput);
        console.log('Nickname: ' + nicknameInput);
        console.log('Password: ' + passwordInput);
        console.log('PasswordCheck: ' + passwordCheckInput); */

        try{
            const response = await fetch('http://localhost:8080/members',
                {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailInput,
                        nickname: nicknameInput,
                        password: passwordInput
                    }),
                }
                
            );
            if(response.ok){
                console.log('회원가입 성공');
            }else{
                console.log('회원가입 실패: ', response.status);
            }
        } catch (error){
            console.error('회원가입 실패', error);
        }
    };

    return (
        <div className="app">
            {/* <MobileHeader></MobileHeader> */}
            <Header></Header>
            <WelcomeText></WelcomeText>
            <RegisterInput title='이메일' placeholder='이메일을 입력해주세요' setState={setEmailInput}></RegisterInput>
            <RegisterInput title='닉네임' placeholder='닉네임을 입력해주세요' setState={setNicknameInput}></RegisterInput>
            <PasswordInput setState = {setPasswordInput} setState2 = {setPasswordCheckInput}></PasswordInput>
            <button className="registration-button" onClick={registration}>회원 가입</button>
        </div>
    );
} 
export default RegistrationPage;