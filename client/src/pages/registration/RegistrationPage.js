import './RegistrationPage.css';
import Header from '../../components/Header.js';
import AppContainer from '../../components/AppContainer.js';
import './RegistrationPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal(Check).js';
import EmailAuthModal from '../../components/Modal(EmailAuth).js';

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


function WelcomeText(){
    return (
        <div className="welcome-text">
            <h2>만나서 반가워요 😄 </h2>
            <h2>회원가입을 진행할게요!</h2>
        </div>
    );
}

function RegisterInput({ title, placeholder, value, setValue, error, setError, onBlur, onCheck }) {
    return (
        <div className="register-input-container">
            <div className="register-input-wrapper">
            <h2 className="register-input-title">{title}</h2>
            </div>
            <input
                type={title === '비밀번호' || title === '비밀번호 확인' ? 'password' : 'text'}
                placeholder={placeholder}
                className={`register-input ${title === '비밀번호' || title === '비밀번호 확인' ? 'password-input' : ''}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
            />
            <div className="error-and-button">
                {error && <div className="error-message">{error}</div>}
                {(title === '이메일' || title === '닉네임') && (
                    <button className="regist-check-button" onClick={onCheck}>중복 확인</button>
                )}
            </div>
        </div>
    );
}

// 가짜 API 호출 함수 예시
const fakeApiCheck = async (type, email, nickname) => {
    // 실제 API 호출 로직을 여기에 작성
    if (type === '이메일') {
        return email === 'test@example.com'; // 예시 중복 체크
    } else if (type === '닉네임') {
        return nickname === 'testuser'; // 예시 중복 체크
    }
    return false;
};

function RegisterButton({ email, nickname, password, confirmPassword, emailError, nicknameError, passwordError, confirmPasswordError }) {
    const navigate = useNavigate();
    const [isEmailAuthModalOpen, setIsEmailAuthModalOpen] = useState(false);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
    const [checkMessage, setCheckMessage] = useState('');

    const handleRegisterClick = async () => {
        if (!emailError && !nicknameError && !passwordError && !confirmPasswordError && email && nickname && password && confirmPassword) {
            if (password !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
            } else {
                const isEmailDuplicate = await fakeApiCheck('이메일', email);
                const isNicknameDuplicate = await fakeApiCheck('닉네임', nickname);
                if (isEmailDuplicate) {
                    setCheckMessage('이메일이 중복되었습니다.');
                    setIsCheckModalOpen(true);
                } else if (isNicknameDuplicate) {
                    setCheckMessage('닉네임이 중복되었습니다.');
                    setIsCheckModalOpen(true);
                } else {
                    setIsEmailAuthModalOpen(true);
                }
            }
        } else {
            alert('모든 필드를 올바르게 입력해주세요.');
        }
    };

    const handleCheckClick = async (type) => {
        if (type === '이메일' && email) {
            const isEmailDuplicate = await fakeApiCheck('이메일', email);
            if (isEmailDuplicate) {
                setCheckMessage('이메일이 중복되었습니다.');
                setIsCheckModalOpen(true);
            } else {
                alert('사용 가능한 이메일입니다.');
            }
        } else if (type === '닉네임' && nickname) {
            const isNicknameDuplicate = await fakeApiCheck('닉네임', nickname);
            if (isNicknameDuplicate) {
                setCheckMessage('닉네임이 중복되었습니다.');
                setIsCheckModalOpen(true);
            } else {
                alert('사용 가능한 닉네임입니다.');
            }
        } else {
            alert('이메일 또는 닉네임을 입력해주세요.');
        }
    };

    return (
        <>
            <button className="registration-button" onClick={handleRegisterClick}>회원 가입</button>
            {isEmailAuthModalOpen && <EmailAuthModal onClose={() => setIsEmailAuthModalOpen(false)} />}
            {isCheckModalOpen && <Modal message={checkMessage} onClose={() => setIsCheckModalOpen(false)} />}
        </>
    );
}

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isEmailAuthModalOpen, setIsEmailAuthModalOpen] = useState(false);
    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
    const [checkMessage, setCheckMessage] = useState('');

    const handleBlur = (field) => {
        if (field === 'email') {
            if (!email) {
                setEmailError('빈칸은 허용되지 않습니다');
            } else {
                setEmailError('');
            }
        }
        if (field === 'nickname') {
            if (!nickname) {
                setNicknameError('빈칸은 허용되지 않습니다');
            } else {
                setNicknameError('');
            }
        }
        if (field === 'password') {
            if (!password) {
                setPasswordError('빈칸은 허용되지 않습니다');
            } else {
                setPasswordError('');
            }
        }
        if (field === 'confirmPassword') {
            if (!confirmPassword) {
                setConfirmPasswordError('빈칸은 허용되지 않습니다');
            } else if (password !== confirmPassword) {
                setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            } else {
                setConfirmPasswordError('');
            }
        }
    };

    const handleChange = (field, value) => {
        if (field === 'email') {
            setEmail(value);
            if (!value) {
                setEmailError('빈칸은 허용되지 않습니다');
            } else {
                setEmailError('');
            }
        }
        if (field === 'nickname') {
            setNickname(value);
            if (!value) {
                setNicknameError('빈칸은 허용되지 않습니다');
            } else {
                setNicknameError('');
            }
        }
        if (field === 'password') {
            setPassword(value);
            if (!value) {
                setPasswordError('빈칸은 허용되지 않습니다');
            } else {
                setPasswordError('');
            }
        }
        if (field === 'confirmPassword') {
            setConfirmPassword(value);
            if (!value) {
                setConfirmPasswordError('빈칸은 허용되지 않습니다');
            } else if (password !== value) {
                setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            } else {
                setConfirmPasswordError('');
            }
        }
    };

    const handleCheckClick = async (type) => {
        if (type === '이메일' && email) {
            const isEmailDuplicate = await fakeApiCheck('이메일', email);
            if (isEmailDuplicate) {
                setCheckMessage('이메일이 중복되었습니다.');
                setIsCheckModalOpen(true);
            } else {
                alert('사용 가능한 이메일입니다.');
            }
        } else if (type === '닉네임' && nickname) {
            const isNicknameDuplicate = await fakeApiCheck('닉네임', nickname);
            if (isNicknameDuplicate) {
                setCheckMessage('닉네임이 중복되었습니다.');
                setIsCheckModalOpen(true);
            } else {
                alert('사용 가능한 닉네임입니다.');
            }
        } else {
            alert('이메일 또는 닉네임을 입력해주세요.');
        }
    };

    return (
        <div className="app">
            <AppContainerComponent />
            <HeaderComponent />
            <WelcomeText />
            <RegisterInput title='이메일' placeholder='이메일을 입력해주세요' value={email} setValue={(value) => handleChange('email', value)} error={emailError} setError={setEmailError} onBlur={() => handleBlur('email')} onCheck={() => handleCheckClick('이메일')} checkButtonClass="check-button" />
            <RegisterInput title='닉네임' placeholder='닉네임을 입력해주세요' value={nickname} setValue={(value) => handleChange('nickname', value)} error={nicknameError} setError={setNicknameError} onBlur={() => handleBlur('nickname')} onCheck={() => handleCheckClick('닉네임')} checkButtonClass="check-button" />
            <RegisterInput title='비밀번호' placeholder='비밀번호를 입력해주세요' value={password} setValue={(value) => handleChange('password', value)} error={passwordError} setError={setPasswordError} onBlur={() => handleBlur('password')} />
            <RegisterInput title='비밀번호 확인' placeholder='비밀번호를 다시 입력해주세요' value={confirmPassword} setValue={(value) => handleChange('confirmPassword', value)} error={confirmPasswordError} setError={setConfirmPasswordError} onBlur={() => handleBlur('confirmPassword')} />
            <RegisterButton email={email} nickname={nickname} password={password} confirmPassword={confirmPassword} emailError={emailError} nicknameError={nicknameError} passwordError={passwordError} confirmPasswordError={confirmPasswordError} />
            {isEmailAuthModalOpen && <EmailAuthModal onClose={() => setIsEmailAuthModalOpen(false)} />}
            {isCheckModalOpen && <Modal message={checkMessage} onClose={() => setIsCheckModalOpen(false)} />}
        </div>
    );
}

export default RegistrationPage;