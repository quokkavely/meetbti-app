import React, { useEffect, useState, useRef, useCallback } from 'react';
import './RegistBalanceGame.css';

import AppContainer from '../components/AppContainer';
import Header from '../components/Header';


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


const BalanceGamePostTitle = ({setBalanceGameTitle}) => {
    return (
    <div className='balance-game-input-post-title'>
        <input type="text" placeholder='제목을 입력하세요' className='title-input' 
        onChange={(e) => setBalanceGameTitle(e.target.value)}/>
    </div>
    );
  };


const NoticeSection = () => {
    return (
        <div className='notice-section'> # 논란이 될 만한 소지가 있는 게시글은 삭제될 수 있습니다.
        <br/># 게시글은 신고 여부에 따라 삭제될 수 있습니다.</div>
    );
};


const BalanceGamePostContent = ({ setBalanceGameContent }) => {
  const [firstSelect, setFirstSelect] = useState('');
  const [secondSelect, setSecondSelect] = useState('');
  const [IsNullNotice, setIsNullNotice] = useState(false);
  const [AlsoNullNotice, setAlsoNullNotice] = useState(false);

  const handleFirstSelectChange = (e) => {
    const value = e.target.value;
    setFirstSelect(value);
    setIsNullNotice(value.trim() === '');
    setBalanceGameContent(value);
  };

  const handleSecondSelectChange = (e) => {
    const value = e.target.value;
    setSecondSelect(value);
    setAlsoNullNotice(value.trim() === '');
    setBalanceGameContent(value);
  };

  return (
    <div className="balance-game-input-section">
      항목 입력
      <input
        className="first-select-content"
        type="text"
        placeholder='첫번째 항목을 입력해주세요'
        onChange={handleFirstSelectChange}
      />
      {IsNullNotice && (
        <div className='notice'> 빈 칸은 허용되지 않습니다.</div>
      )}
      <input
        className="second-select-content"
        type="text"
        placeholder='두번째 항목을 입력해주세요'
        onChange={handleSecondSelectChange}
      />
      {AlsoNullNotice && (
        <div className='notice'> 빈 칸은 허용되지 않습니다.</div>
      )}
    </div>
  );
};

const BalanceGameRegistButton = ({ onSubmit }) => {
    return (
        <div className='balance-game-regist-button'>
            <button onClick={onSubmit}>등록</button>
        </div>
    );
};


  // 게시판 페이지 컴포넌트
const RegistBalanceGame = () => {
    // const navigate = useNavigate();
    const [balanceGameTitle, setBalanceGameTitle] = useState('');
    const [balanceGameContent, setBalanceGameContent] = useState('');

    const handleSubmit = () => {
        // 게시글 등록 로직 추가
        const postData = {
            balanceGameTitle,
            balanceGameContent,
        };
        console.log('게시글 등록:', postData);
        // 등록 후 페이지 이동
        // navigate('/BalanceGame');
    };
    
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <BalanceGamePostTitle setBalanceGameTitle={setBalanceGameTitle} />
        <NoticeSection />
        <BalanceGamePostContent setBalanceGameContent={setBalanceGameContent} />
        <BalanceGameRegistButton onSubmit={handleSubmit} />
      </div>
    );
  };
  
export default RegistBalanceGame;