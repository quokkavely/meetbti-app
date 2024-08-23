import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { state, useAuth } from '../auth/AuthContext';

// 헤더 컴포넌트
const Header = (props) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-box">
        <div className='logo-img' onClick={() => navigate('/')}>
          <img src="/public-img/Main-logo.png" alt='메인로고'/>
        </div>
        <div className="user-icon-container">
          <div className='user-nickname'>
              <div className='user-name-box'>{props.userNickname} 님</div>
              <div className='user-welcome'>반갑습니다!</div>
          </div>
          <img src="/public-img/profile.png" alt="사용자 아이콘" onClick={() => navigate(props.login ? '/mypage' : '/login')}/>
        </div>
      </div>
      <div className="logo-text">
        <h1>본격 MBTI 커뮤니티!</h1>
      </div>
    </header>
  )
};

// MBTI 테스트 컴포넌트
const MBTITest = (props) => {
  const navigate = useNavigate();
  return (
    <div className="mbti-test-card">
      <img src="main.png" alt="MBTI Test" className="mbti-image"/>
      <div className="mbti-test">
        <h2>MBTI TEST</h2>
        <button onClick={() => {
          navigate(props.login ? '/TestMain' : '/login');
         console.log(props.login);
         }}>START</button>
      </div>
    </div>
  )
};

// 카드 컴포넌트
const Card = ({ image, title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
      </div>
    </div>
  )
};

// 메인 콘텐츠 컴포넌트
const MainContent = (props) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  return (
    <main className="main-content">
      <MBTITest login = {props.login}/>
      <div className="other-mbti">
        <div className="other-mbti-container">
          다른 MBTI들의 생각은?!
        </div>
        <div className="go-point">
          <img src="/public-img/to.png" alt='가기' onClick={() => navigate(props.login ? '/MBTIBoard' : '/login')}/>
        </div>
      </div>
      <Slider {...settings} className="card-list">
        <Card 
          image="/public-img/redgirl.jpeg" 
          title="INFJ" 
          description="선의의 옹호자" 
          onClick={() => navigate(props.login ? '/MBTIBoard' : '/login')}
        />
        <Card
          image="/public-img/whitegirl.jpeg" 
          title="INTP" 
          description="개발자의 MBTI" 
          onClick={() => navigate(props.login ? '/MBTIBoard' : '/login')}
        />
        <Card 
          image="/public-img/redgirl.jpeg" 
          title="INFJ" 
          description="선의의 옹호자" 
          onClick={() => navigate(props.login ? '/MBTIBoard' : '/login')} 
        />
        <Card
          image="/public-img/whitegirl.jpeg" 
          title="INTP" 
          description="개발자의 MBTI" 
          onClick={() => navigate(props.login ? '/MBTIBoard' : '/login')}
        />
        <Card 
          image="/public-img/redgirl.jpeg" 
          title="INFJ" 
          description="선의의 옹호자" 
          onClick={() => navigate(props.login ? '/MBTIBoard' : '/login')}
        />
        <Card
          image="/public-img/whitegirl.jpeg" 
          title="INTP" 
          description="개발자의 MBTI" 
          onClick={() => navigate(props.login ? '/MBTIBoard' : '/login')}
        />
      </Slider>
      <div className="snack">
        <div className="snack-title">
        즐겨보세요, 스낵 컬처!
        </div>
        <div className="go-point">
           <img src="/public-img/to.png" alt='가기' onClick={() => navigate(props.login ? '/snackmain' : '/login')}/>
        </div>
      </div>
      <Slider {...settings} className="card-list">
        <Card 
          image="/public-img/snack-img1.jpeg" 
          title="이미지 게임" 
          description="가장 ~~ 할 것 같은 MBTI는?"
          onClick={() => navigate(props.login ? '/ImageGame' : '/login')}
        />
        <Card 
          image="/public-img/snack-img2.jpeg" 
          title="밸런스 게임" 
          description="말해 Yes or No" 
          onClick={() => navigate(props.login ? '/BalanceGame' : '/login')}
        />
        <Card 
          image="/public-img/snack-img1.jpeg" 
          title="MBTMI" 
          description="MBTI의 TMI 대방출!" 
          onClick={() => navigate(props.login ? '/MBTMI' : '/login')}
        />
      </Slider>
    </main>
  )
};

// 앱 컴포넌트
const MainPage = () => {
  const { isAuthenticated } = useAuth().state;
  const { user } = useAuth().state;

  console.log('user: ');
  console.log(user);
  console.log(state);
  
  return (
    
    <div className="app">
      <Header login = {isAuthenticated} /* userNickname = {user} *//>
      <MainContent login = {isAuthenticated}/>
    </div>
  );
};

export default MainPage;