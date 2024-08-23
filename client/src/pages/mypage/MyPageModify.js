import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPageModify.css';

// 컴포넌트 임포트
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';

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


const ModifySection = () => {
    const [showModal, setShowModal] = useState(false);
    const [nickname, setNickname] = useState('');
    const [nicknameNotice, setNicknameNotice] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordNotice, setShowPasswordNotice] = useState(false);
    const [showConfirmPasswordNotice, setShowConfirmPasswordNotice] = useState(false);
    const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNickname(value);
        if (value.length > 10) {
            setNicknameNotice('닉네임은 10자 이내로 입력해주세요.');
        } else {
            setNicknameNotice('');
        }
    };

    const checkNicknameDuplicate = () => {
        // 닉네임 중복 확인 로직 (예: API 호출)
        const isDuplicate = false; // 예시로 중복되지 않음을 가정
        setIsNicknameDuplicate(isDuplicate);
        if (isDuplicate) {
            setNicknameNotice('사용할 수 없는 닉네임입니다.');
        } else {
            setNicknameNotice('사용할 수 있는 닉네임입니다.');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setShowPasswordNotice(e.target.value === '');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setShowConfirmPasswordNotice(e.target.value !== password);
    };

    return (
        <div className="modify-section">
            <div className="modify-section-title"> 내 정보 수정 </div>
            <div className="modify-input-container">
                <div className="nickname-section">
                    <div className="modify-section-nickname">닉네임</div>
                    <input 
                        className="modify-section-content" 
                        type="text" 
                        placeholder='변경할 닉네임을 입력해주세요'
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    {nicknameNotice && (
                        <div className='notice'>{nicknameNotice}</div>
                    )}
                    <button className='nickname-check-button' onClick={checkNicknameDuplicate}>중복확인</button>
                </div>
                <div className="password-section">
                    <div className="modify-section-password">비밀번호</div>
                    <input 
                        className="modify-section-content" 
                        type="text" 
                        placeholder='변경할 비밀번호를 입력해주세요'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {showPasswordNotice && (
                        <div className='notice'> 비밀번호는 10자 이상 입력해주세요.</div>
                    )}
                    <input 
                        className="modify-section-content" 
                        type="text" 
                        placeholder='변경할 비밀번호를 입력해주세요'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {showConfirmPasswordNotice && (
                        <div className='notice'> 비밀번호가 일치하지 않습니다.</div>
                    )}
                </div>
            </div>
            <button className="modify-button">확인</button>
            <div className="withdrawal-container">
                <button className="withdrawal-button" onClick={openModal}>회원탈퇴</button>
            </div>
            <WithdrawalModal showModal={showModal} closeModal={closeModal} />
        </div>
    );
};

const WithdrawalModal = ({ showModal, closeModal }) => {
    if (!showModal) return null;

    return (
        <div className="withdrawal-modal">
                <div className="withdrawal-modal-title">회원탈퇴</div>
                <div className="withdrawal-modal-box">
                    <div className="withdrawal-modal-text-title">정말 탈퇴하시겠습니까?</div>
                    <div className="withdrawal-modal-text-content">탈퇴 버튼 선택 시, 저장되어있던 모든 정보와 데이터가 삭제되며, 복구 되지 않습니다.</div>
                </div>
                <div className="withdrawal-modal-buttons">
                    <button className="withdrawal-modal-button1" onClick={closeModal}>탈퇴</button>
                    <button className="withdrawal-modal-button2" onClick={closeModal}>회원유지</button>
                </div>
        </div>
    );
};

const MyPageModify = () => {
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <ModifySection />
        <WithdrawalModal />
      </div>
    );
  };
  
  export default MyPageModify;