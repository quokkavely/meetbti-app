import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { state, useAuth } from '../auth/AuthContext';
import getMyInfo from '../requests/GetMyInfo';
import sendLogoutRequest from '../requests/LogoutRequest';

// 헤더 컴포넌트
const Header = (props) => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-box">
        <div className='logo-img' onClick={() => navigate('/')}>
          <img src="/public-img/Main-logo-light.png" alt='메인로고'/>
        </div>
        {!props.login ? <button className='main-login-button' onClick={() => navigate('/login')}>로그인</button> : 
        <div className="user-icon-container">
          <div className='user-nickname'>
              <div className='user-name-box'>{props.userNickname} 님</div>
              <div className='user-welcome'>반갑습니다!</div>
          </div>
          <img src="/public-img/profile.png" alt="사용자 아이콘" 
            onClick={() => navigate(props.state.email.email === 'admin@gmail.com' ? '/report' : '/mypage')}/>
        </div>}
      </div>
      <div className="logo-text-logout">
        <div className="logo-text">
          <div className='logo-text1'>본격 MBTI 커뮤니티!</div>
        </div>
        {props.state.isAuthenticated && <button className = 'logout-button' onClick={() => {
          if(window.confirm('로그아웃하시겠어요?')){
            sendLogoutRequest(props.state, props.logout)
          }         
        }}>로그아웃</button>}
      </div>
    </header>
  )
};

// MBTI 테스트 컴포넌트
const MBTITest = (props) => {
  const navigate = useNavigate();
  return (
    <div className="mbti-test-container">
      <div className="mbti-test-card">
        <img src="/public-img/Main-Img.png" alt="MBTI Test" className="mbti-image"/>
        <div className="mbti-test">
          <div className="mbti-test-text">MBTI TEST</div>
          <button onClick={() => {
            navigate(props.login ? '/TestMain' : '/login');
            console.log(props.login);
          }}>START</button>
        </div>
      </div>
    </div>
  )
};

// 카드 컴포넌트
const Card = ({ image, title, description, onClick, className, contentClassName, titleClassName, descriptionClassName }) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      <img src={image} alt={title} className="card-image" />
      <div className={contentClassName ? contentClassName : "card-content"}>
        <div className={titleClassName ? titleClassName : "card-title"}>{title}</div>
        <div className={descriptionClassName ? descriptionClassName : "card-description"}>{description}</div>
      </div>
    </div>
  )
};

// 메인 콘텐츠 컴포넌트
const MainContent = (props) => {
  const navigate = useNavigate();
  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const cards1 = [
    { image: "/mbti-img/ENFP.png", title: "ENFP", description: "선의의 옹호자" },
    { image: "/mbti-img/ENFJ.png", title: "ENFJ", description: "선의의 옹호자" },
    { image: "/mbti-img/ENTJ.png", title: "ENTJ", description: "선의의 옹호자" },
    { image: "/mbti-img/ENTP.png", title: "ENTP", description: "개발자의 MBTI" },
    { image: "/mbti-img/ESFP.png", title: "ESFP", description: "선의의 옹호자" },
    { image: "/mbti-img/ESTP.png", title: "ESTP", description: "선의의 옹호자" },
    { image: "/mbti-img/ESFJ.png", title: "ESFJ", description: "선의의 옹호자" },
    { image: "/mbti-img/ESTJ.png", title: "ESTJ", description: "선의의 옹호자" },
    { image: "/mbti-img/INFP.png", title: "INFP", description: "선의의 옹호자" },
    { image: "/mbti-img/INFJ.png", title: "INFJ", description: "선의의 옹호자" },
    { image: "/mbti-img/INTP.png", title: "INTP", description: "선의의 옹호자" },
    { image: "/mbti-img/INTJ.png", title: "INTJ", description: "선의의 옹호자" },
    { image: "/mbti-img/ISFP.png", title: "ISFP", description: "선의의 옹호자" },
    { image: "/mbti-img/ISFJ.png", title: "ISFJ", description: "선의의 옹호자" },
    { image: "/mbti-img/ISTP.png", title: "ISTP", description: "선의의 옹호자" },
    { image: "/mbti-img/ISTJ.png", title: "ISTJ", description: "선의의 옹호자" },
  ];

  const cards2 = [
    { image: "/public-img/Image-img.jpeg", title: "이미지 게임", description: "가장 ~~ 할 것 같은 MBTI는?" },
    { image: "/public-img/Balance-img.jpeg", title: "밸런스 게임", description: "말해 Yes or No!" },
    { image: "/public-img/MBTMI-img.png", title: "MBTMI", description: "MBTI의 TMI 대방출!" }
  ];

  // 배열을 랜덤으로 섞는 함수
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledCards1 = shuffleArray(cards1).slice(0, 16); // 랜덤으로 섞은 후 8개 선택
  const shuffledCards2 = shuffleArray(cards2);

  return (
    <main className="main-content">
      <MBTITest login={props.login} />
      <div className="other-mbti">
        <div className="other-mbti-container" onClick={() => navigate(props.login ? `/MBTIBoard?category=${props.myMbti}` : '/login')}>
          다른 MBTI들의 생각은?!
        </div>
        <div className="go-point">
          <img src="/public-img/to(pink).png" alt='가기' onClick={() => navigate(props.login ? `/MBTIBoard?category=${props.myMbti}` : '/login')} />
        </div>
      </div>
      <div className="slider-container">
        <Slider {...settings1} className="card-list">
          {shuffledCards1.map((card, index) => (
            <Card 
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              onClick={() => navigate(props.login ? `/MBTIBoard?category=${props.myMbti}` : '/login')}
            />
          ))}
        </Slider>
      </div>
      <div className="snack">
        <div className="snack-title" onClick={() => navigate(props.login ? '/snackmain' : '/login')}>
          즐겨보세요, 스낵 컬처!
        </div>
        <div className="go-point">
          <img src="/public-img/to(pink).png" alt='가기' onClick={() => navigate(props.login ? '/snackmain' : '/login')} />
        </div>
      </div>
      <div className="slider-container2">
        <Slider {...settings2} className="card-list2">
          {shuffledCards2.map((card, index) => (
            <Card 
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              onClick={() => {
                if (card.title === "이미지 게임") {
                  navigate(props.login ? '/ImageGame' : '/login');
                } else if (card.title === "밸런스 게임") {
                  navigate(props.login ? '/BalanceGame' : '/login');
                } else if (card.title === "MBTMI") {
                  navigate(props.login ? '/MBTMI' : '/login');
                }
              }}
              className="large-card"
              contentClassName="card-content2"
              titleClassName="snack-title-in"
              descriptionClassName="snack-description-in"
            />
          ))}
        </Slider>
      </div>
    </main>
  )
};

// 앱 컴포넌트
const MainPage = () => {
  const { isAuthenticated } = useAuth().state;
  const { state, logout } = useAuth();
  const [myData, setMyData] = useState({data:{mbti:'NONE'}});
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('Unknown');

  console.log('state: ', state);

  useEffect(() => {
    console.log('메인 페이지 로드!')
    const fetchData = async () => {
      try{
        await getMyInfo(state, setMyData, setLoading);
      }catch(error){
        console.error('회원 정보 요청 실패', error);
      }finally{
        setLoading(false);
      }
    }
    if(state.isAuthenticated){
      fetchData();
    }
    
  }, [state]);

  useEffect(() =>{
    if(myData && myData.data && myData.data.nickname){
      setNickname(myData.data.nickname);
    }
  }, [myData]);
  
  return ( 
    <div className="app">
      <Header 
        login = {isAuthenticated}
        userNickname={state.isAuthenticated ? nickname : 'Unknown'}
        state = {state}
        logout = {logout}
      />
      <MainContent login = {isAuthenticated} myMbti = {myData.data.mbti}/>
    </div>
  );
};

export default MainPage;