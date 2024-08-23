import './RegistrationPage.css';
import Header from '../../components/basic_css/Header.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailAuthModal from '../../components/modal/Modal_EmailAuth.js';
import { useAuth } from '../../auth/AuthContext.js';
import ModalCheck from '../../components/modal/ModalCheck.js';

function WelcomeText(){
    return (
        <div className="welcome-text">
            <h2>만나서 반가워요😄</h2>
            <h2>회원가입을 진행할게요</h2>
        </div>
    );
}
function RegisterInput(props){
    const buttomContent = '중복 확인' + (props.duplChecked ? ' ✔' : '');

    return (
        <div className="register-input-container">
            <h2 className="register-input-title">{props.title}</h2>
            <input type='text' className='register-input' placeholder={props.placeholder}
             onChange={(e) => onChangeInput(e,props.setState, props.regex, props.setError, props.duplCheck)}></input>
             <div className='register-input-footer'>
                <div className='input-error-message'>{props.error && props.errorMessage}</div>
                <button className="register-dupl-button" onClick={() => {
                    props.duplCheck(true);
                    props.getModalMessage();
                    props.openModal(props.modalMessage);
                 }}
                 style={{ '--dupl-button-color': `${props.duplChecked ? '#b972fc' : '#d1d1d1'}` }}
                 >{buttomContent}</button>
             </div>
        </div>
    );
}
function PasswordInput(props){
    return (
        <div className="register-input-container">
            <h2 className="register-input-title">비밀번호</h2>
            <input type='password' className='register-input' placeholder='비밀번호를 입력해주세요'
             onChange={(e) => onChangePassword(e, props.setState, props.regex, 
                props.setError, props.opponentContent, props.setError2)}></input>
            <div className='password-error-message'>{props.error && props.errorMessage}</div>
        </div>
    );
}
const PasswordCheckInput = (props) => {
    return (
        <div className='register-input-container'>
            <input type='password' className='password-input' placeholder='비밀번호를 입력해주세요'
             onChange={(e) => {
                onChangePasswordCheck(e, props.setState, props.passwordInput, props.setError);
                console.log('error: ' + props.error)
                }}></input>
            <div className='password-error-message'>{props.error && props.errorMessage}</div>
        </div>
    );
}
const validateInput = (input, regexStr) => {
    const regex = new RegExp(regexStr);
    return regex.test(input);
}
function onChangeInput(e, setState, regex, setError, setDuplChecked){
    setState(e.target.value);
    const passed = validateInput(e.target.value, regex)
    setError(!passed);
    if(setDuplChecked !== undefined){
        setDuplChecked(false);
    }
}

const onChangePassword = (e, setState, regex, setError, opponentContent, opponentSetError) => {
    onChangeInput(e, setState, regex, setError);
    // 비밀번호 수정될 때 비밀번호 확인의 에러 상태도 수정
    const opponentValue = opponentContent.target.value;
    if(opponentValue !== ''){
        const opponentPassed = (e.target.value === opponentValue);
        console.log("this: " + e.target.value);
        console.log("opponent: " + opponentValue);
        opponentSetError(!opponentPassed);
    }
}
const onChangePasswordCheck = (content, setContent, opponentInput, setError) => {
    setContent(content);
    /* console.log("opponent: " + opponentInput);
    console.log("content: " + content.target.value);
    console.log(passed); */
    const passed = (opponentInput === content.target.value);
    setError(!passed);
}


const RegistrationPage = (props) => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nicknameInput, setNicknameInput] = useState('');
    const [nicknameError, setNicknameError] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordCheckInput, setPasswordCheckInput] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState(false);

    const [duplCheckModalOn, setDuplCheckModalOn] = useState(false);
    const [isEmailAuthModalOpen, setIsEmailAuthModalOpen] = useState(false);

    const [emailDuplChecked, setEmailDuplChecked] = useState(false);
    const [nicknameDuplChecked, setNicknameDuplChecked] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const registration = async (openEmailAuthModal) => {
        

        if(!emailDuplChecked){
            alert('이메일 중복 확인을 진행해주세요')
            return;
        }
        if(!nicknameDuplChecked){
            alert('닉네임 중복 확인을 진행해주세요')
            return;
        }
        if(passwordInput === '' || passwordError){
            alert('비밀번호를 확인해주세요')
            setPasswordError(true);
            return;
        }
        if(passwordCheckInput === '' || passwordCheckError){
            alert('비밀번호를 한번 더 확인해주세요')
            setPasswordCheckError(true);
            return;
        }

        openEmailAuthModal();
    };
    const sendRegistrationRequest = async() => {
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
                const token = response.headers.get('Authorization');
                console.log('회원가입 성공');
                login(token, emailInput, nicknameInput);
                navigate('/');
            }else{
                console.log('회원가입 실패: ', response.status);
            }
        } catch (error){
            console.error('회원가입 실패', error);
        }
    }


    return (
        <div className="app">
            {/* <MobileHeader></MobileHeader> */}
            <Header></Header>
            <WelcomeText></WelcomeText>

            <RegisterInput title='이메일' placeholder='이메일을 입력해주세요'
             error = {emailError} errorMessage='이메일은 공백이 아니어야 해요'
              setState={setEmailInput} regex = '^.+$' setError={setEmailError}
              duplChecked = {emailDuplChecked} duplCheck={(dupl) => setEmailDuplChecked(dupl)}
              openModal = {() => setDuplCheckModalOn(true)} getModalMessage = {() => setModalMessage('사용 가능한 이메일이에요')}
              >
            </RegisterInput>

            <RegisterInput title='닉네임' placeholder='닉네임을 입력해주세요' 
            error = {nicknameError} errorMessage='2-10글자 이내로 유효하게 입력해주세요' 
            setState={setNicknameInput} regex = "^[a-zA-Z0-9가-힣]{2,10}$" 
            setError={setNicknameError}
            duplChecked = {nicknameDuplChecked} duplCheck={(dupl) => setNicknameDuplChecked(dupl)}
            openModal = {() => setDuplCheckModalOn(true)} getModalMessage = {() => setModalMessage('사용 가능한 닉네임이에요')}
            >
            </RegisterInput>

            <PasswordInput setState = {setPasswordInput}
            error={passwordError} regex = '(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{10,20}'
            errorMessage='영문 대/소문자,숫자,특수문자 포함 총 10자 이상 입력해주세요' 
            setError={setPasswordError} setError2 = {setPasswordCheckError}
            opponentContent = {passwordCheckInput}
            ></PasswordInput>

            <PasswordCheckInput setState = {setPasswordCheckInput} passwordInput = {passwordInput}
            setError = {setPasswordCheckError} error = {passwordCheckError} 
            errorMessage = '비밀번호가 일치하지 않아요'>
            </PasswordCheckInput>

            <button className="registration-button" onClick={() => registration(()=>{setIsEmailAuthModalOpen(true)})}>회원 가입</button>
            {isEmailAuthModalOpen && <EmailAuthModal 
            onClose={() => setIsEmailAuthModalOpen(false)}
             onRegister={sendRegistrationRequest} 
             correctAuthCode={"test"} />}
            {duplCheckModalOn && <ModalCheck message={modalMessage} onClose={() => setDuplCheckModalOn(false)}></ModalCheck>}
        </div>
    );
} 
export default RegistrationPage;