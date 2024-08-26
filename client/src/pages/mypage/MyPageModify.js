import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPageModify.css';
import sendMemberPatchRequest from '../../requests/MemberPatchRequest';
import { useAuth } from '../../auth/AuthContext';

// 컴포넌트 임포트
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import validateInput from '../../validation/ValidateInput';
import sendChangePasswordRequest from '../../requests/ChangePasswordRequest';
import sendMemberDeleteRequest from '../../requests/MemberDeleteRequest';
import sendNicknameDuplCheckRequest from '../../requests/NicknameDuplCheckRequest';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';

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


const ModifySection = (props) => {
    const { state } = useAuth(); 
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [nicknameInput, setNicknameInput] = useState('');
    const [nicknameNotice, setNicknameNotice] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordNotice, setShowPasswordNotice] = useState(false);
    const [showConfirmPasswordNotice, setShowConfirmPasswordNotice] = useState(false);
    const [nicknameDuplChecked, setNicknameDuplChecked] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleNicknameChange = (e) => {
        const value = e.target.value;
        setNicknameInput(value);
        setNicknameDuplChecked(false);
        if (value.length > 10) {
            setNicknameNotice('닉네임은 10자 이내로 입력해주세요.');
        } else {
            setNicknameNotice('');
        }
    };

    const checkNicknameDuplicate = (nickname, newNickname) => {
        console.log('nickname: ', nickname);
        console.log('newNickname: ', newNickname);
        if(newNickname === ''){
            alert('변경할 닉네임을 입력해주세요');
            return;
        }
        if(nickname === newNickname){
            alert('동일한 닉네임으로 변경할 수 없어요');
            return;
        }
        sendNicknameDuplCheckRequest(newNickname, 
            () => {{
                alert('사용 가능한 닉네임이에요');
                setNicknameDuplChecked(true);
            }},
            () => {alert('이미 사용중인 닉네임이에요')}
        );
    };

    const handlePasswordChange = (e, regex, oppoentContent, setOpponentError) => {
        setPassword(e.target.value);
        const passed = validateInput(e.target.value, regex);
        console.log('passed: ', passed);

        setShowPasswordNotice(!passed);

        // 비밀번호란 수정될 때 비밀번호 확인란 에러 상태도 변경
        const opponentPassed = e.target.value !== oppoentContent;
        console.log('opponentPassed: ', opponentPassed);
        setOpponentError(opponentPassed);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setShowConfirmPasswordNotice(e.target.value !== password);
    };

    const nicknamePatch = () => {
        sendMemberPatchRequest(state, {nickname: nicknameInput});
    }

    const passwordPatch = () => {
        if(password === ''){
            alert('변경할 비밀번호를 입력해주세요');
            return;
        }
        if(showPasswordNotice){
            alert('비밀번호를 올바른 형식으로 입력해주세요');
            return;
        }
        if(showConfirmPasswordNotice){
            alert('비밀번호 확인을 진행해주세요');
            return;
        }
        sendChangePasswordRequest(state, password, confirmPassword);
    }

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
                        value={nicknameInput}
                        onChange={handleNicknameChange}
                    />
                    {nicknameNotice && (
                        <div className='notice'>{nicknameNotice}</div>
                    )}
                    <button className='nickname-check-button'
                    onClick={() => checkNicknameDuplicate(props.myData.data.nickname, nicknameInput)}
                     >{nicknameDuplChecked ? '중복 확인✓' : '중복 확인'}</button>
                </div>
                <button
                 className='modify-button'
                 onClick={() => {
                    if(nicknameInput === ''){
                        alert('변경할 닉네임을 입력해주세요');
                        return;
                    }
                    if(!nicknameDuplChecked){
                        alert('닉네임 중복 확인을 진행해주세요');
                        return;
                    }
                    nicknamePatch();
                    setNicknameInput('');
                    setNicknameDuplChecked(false);
                    }}>닉네임 변경</button>
                <div className="password-section">
                    <div className="modify-section-password">비밀번호</div>
                    <input 
                        className="modify-section-content" 
                        type="password" 
                        placeholder='변경할 비밀번호를 입력해주세요'
                        value={password}
                        onChange={(e) => handlePasswordChange(e,'(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{10,20}', confirmPassword, setShowConfirmPasswordNotice)}
                    />
                    {showPasswordNotice && (
                        <div className='notice'> 영문 대/소문자,숫자,특수문자 포함 총 10자 이상 입력해주세요</div>
                    )}
                    <input 
                        className="modify-section-content" 
                        type="password" 
                        placeholder='변경할 비밀번호를 확인해주세요'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {showConfirmPasswordNotice && (
                        <div className='notice'> 비밀번호가 일치하지 않습니다.</div>
                    )}
                </div>
            </div>
            <button className="modify-button" onClick={passwordPatch}>비밀번호 변경</button>
            <div className="withdrawal-container">
                <button className="withdrawal-button" onClick={openModal}>회원탈퇴</button>
            </div>
            <WithdrawalModal
                showModal={showModal}
                closeModal={closeModal}
                state={state}
                logout={logout}
                navigate={navigate}
                />
        </div>
    );
};

const handleWithdrawal = (state, logout, navigate) => {
    sendMemberDeleteRequest(state, logout, navigate);
}

const WithdrawalModal = ({ showModal, closeModal ,state, logout, navigate} ) => {
    if (!showModal) return null;

    return (
        <div className="withdrawal-modal">
            <div className="withdrawal-modal-title">회원탈퇴</div>
            <div className="withdrawal-modal-box">
                <div className="withdrawal-modal-text-title">정말 탈퇴하시겠어요?</div>
                <div className="withdrawal-modal-text-content">탈퇴 버튼 선택 시 저장되어있던 모든 정보와 데이터가 삭제되며, 복구할 수 없어요.</div>
            </div>
            <div className="withdrawal-modal-buttons">
                <button className="withdrawal-modal-button1" onClick={() => {
                    closeModal();
                    handleWithdrawal(state, logout, navigate);
                    }}>탈퇴</button>
                <button className="withdrawal-modal-button2" onClick={closeModal}>회원유지</button>
            </div>
        </div>
    );
};

const MyPageModify = () => {
    const { state } = useAuth();
    const [myData, setMyData] = useState({data: {}});

    useEffect(() => {
        sendGetMyinfoRequest(state, setMyData);
    }, []);
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <ModifySection myData = {myData}/>
        <WithdrawalModal />
      </div>
    );
  };
  
  export default MyPageModify;