import React, { useState, useEffect } from 'react';
import './Modal(EmailAuth).css';

const EmailAuthModal = ({ onClose, onRegister, correctAuthCode }) => {
    const [authCode, setAuthCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isExpired, setIsExpired] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleRegister = () => {
        if (isExpired) {
            setErrorMessage('인증코드 입력 시간이 만료되었습니다.');
        } else if (authCode === correctAuthCode) {
            onRegister(authCode);
            onClose();
        } else {
            setErrorMessage('인증코드가 일치하지 않습니다.');
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="modal-overlay-email">
            <div className="modal-content-email">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>이메일 본인인증</h2>
                <p>이메일로 전송된 인증 코드를 입력해주세요.</p>
                <input 
                    type="text" 
                    placeholder="인증 코드 입력" 
                    className="email-auth-input" 
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    disabled={isExpired}
                />
                <p className="time-left">남은 시간: {formatTime(timeLeft)}</p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button onClick={handleRegister} className="email-auth-button" disabled={isExpired}>확인</button>
            </div>
        </div>
    );
};

export default EmailAuthModal;