import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginMainPage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


// 헤더 컴포넌트
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-box">
        <div className='logo-img' onClick={() => navigate('/loginmain')}>
          <img src="/Main-logo.png" alt='메인로고'/>
        </div>
        <div className="user-icon-container">
          <img src="profile.png" alt="사용자 아이콘" />
        </div>
      </div>
      <div className="logo-text">
        <h1>본격 MBTI 커뮤니티!</h1>
      </div>
    </header>
  )
};

// 내 MBTI 컴포넌트
const MyMBTI = () => {
  const navigate = useNavigate();
  return (
    <div className="my-mbti-section">
      <img src="mymbti-dummy.png" alt="MBTI Test" className="my-mbti-image"/>
      <div className="my-mbti-info">
        <div className="my-mbti-title">INFJ</div>
        <div className="my-mbti-content">선의의 옹호자</div>
      </div>
      <div className="go-myMBTI">
        <button onClick={() => navigate('/MBTIBoard')}>바로가기</button>
      </div>
    </div>
  )
};

// 카드 컴포넌트
const Card = ({ image, title, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
      </div>
    </div>
  )
};

// 메인 콘텐츠 컴포넌트
const MainContent = () => {
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
      <MyMBTI />
      <div className="other-mbti">
        <div className="other-mbti-container">
          다른 MBTI들의 생각은?!
        </div>
        <div className="go-point">
          <img src="to.png" alt='가기' onClick={() => navigate('/MBTIBoard')}/>
        </div>
      </div>
      <Slider {...settings} className="card-list">
         <Card 
          image="redgirl.jpeg" 
          title="INFJ" 
          description="선의의 옹호자"
          onClick={() => navigate('/loginmain')}
          />
         <Card
          image="whitegirl.jpeg" 
          title="INTP" 
          description="개발자의 MBTI" 
          onClick={() => navigate('/loginmain')}
          />
          <Card 
          image="redgirl.jpeg" 
          title="INFJ" 
          description="선의의 옹호자" 
          onClick={() => navigate('/loginmain')}
          />
          <Card
          image="whitegirl.jpeg" 
          title="INTP" 
          description="개발자의 MBTI" 
          onClick={() => navigate('/loginmain')}
          />
          <Card 
          image="redgirl.jpeg" 
          title="INFJ" 
          description="선의의 옹호자" 
          />
          <Card
          image="whitegirl.jpeg" 
          title="INTP" 
          description="개발자의 MBTI" 
          onClick={() => navigate('/loginmain')}
          />
      </Slider>
      <div className="snack">
        <div className="snack-title">
        즐겨보세요, 스낵 컬처!
        </div>
        <div className="go-point">
           <img src="to.png" alt='가기' onClick={() => navigate('/loginmain')}/>
        </div>
      </div>
      <Slider {...settings}  className="card-list">
        <Card 
          image="snack-img1.jpeg" 
          title="이미지 게임" 
          description="가장 ~~ 할 것 같은 MBTI는?"
          onClick={() => navigate('/loginmain')}
        />
        <Card 
          image="snack-img2.jpeg" 
          title="밸런스 게임" 
          description="말해 Yes or No"
          onClick={() => navigate('/loginmain')}
        />
        <Card 
          image="snack-img1.jpeg" 
          title="MBTMI" 
          description="MBTI의 TMI 대방출!" 
          onClick={() => navigate('/loginmain')}
        />
      </Slider>
    </main>
  )
};

// 앱 컴포넌트
const LoginMainPage = () => {
  return (
    <div className="app">
      <Header />
      <MainContent />
    </div>
  );
};

export default LoginMainPage;