import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestResult.css';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import { useAuth } from '../../auth/AuthContext';
import mbtiData from '../../mbtiData/mbtiData';
import sendGetLastTestResultRequest from '../../requests/GetTestResult';
import KakaoShare from '../../share/KakaoShare';


// 헤더(로고, 뒤로가기) 컴포넌트
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


// MBTI 테스트 컴포넌트
const MBTITestResult = ({ mbti }) => {
  const [resultImage, setResultImage] = useState(`mbti-img/${mbti}.gif`);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResultImage(`mbti-img/${mbti}.png`);
    }, 6000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [mbti]);
  console.log('resultImg: ', resultImage);

  return (
    <div className="ResultImg">
      <img  
        src={resultImage} 
        alt="Test Result" 
        className="mbti-test-result-image"/>
    </div>
  )
};


const MBTIFeature = ({ mbti, description}) => {
  const [mbtiDescriprion, setMbtiDescription] = useState(mbtiData);
  
  return (
    <div className="mbti-feature">
        <div className="mbti-feature-title-box">
          <div className="mbti-type">{mbti}</div>
          <div className="mbti-feature-title"> 성격 특징 </div>
        </div>
        <div className="mbti-feature-content" style={{ whiteSpace: 'pre-line' }}>
          {description}
        </div>
    </div>
  )
};



// 선 컴포넌트
const Line = () => {
  return (
    <div className="line"></div>
  )
};

const GraphTitle = () => {
  return (
    <div className="graph-title">나의 MBTI 테스트 결과</div>
  )
};
const GraphBar = ({ rate, leftName, rightName, leftEngName, rightEngName }) => {
  return (
    <div>
      <div className="mbti-graph-row">
        <div className="mbti-graph-label">
          <div className="graph-label">{`${rate}%`}</div>
          <div className="graph-text">{leftName}</div>
        </div>
        <div className="mbti-graph-bar-container">
          <div className={rate >= 50 ? `mbti-graph-bar ${leftEngName}-win` : 'mbti-graph-bar lose'} style={{ width: `${rate}%` }}></div>
          <div className={rate < 50 ? `mbti-graph-bar ${rightEngName}-win` : 'mbti-graph-bar lose'} style={{ width: `${100 - rate}%` }}></div>
        </div>
        <div className="mbti-graph-label">
          <div className="graph-label">{`${100 - rate}%`}</div>
          <div className="graph-text">{rightName}</div>
        </div>
      </div>
    </div>
  );
}

// 그래프 컴포넌트
const MBTITestResultPercent = (mbtiData) => {
  return (
    <div className="mbti-graph-container">
      <GraphBar 
      rate={mbtiData.mbtiData.scoreEI / 4}
      leftName='외향형' rightName='내향형'
      leftEngName='extraverted' rightEngName='introverted'>
      </GraphBar>
      <GraphBar
      rate={mbtiData.mbtiData.scoreSN / 4}
      leftName='현실주의형' rightName='직관형'
      leftEngName='observant' rightEngName='intuitive'>
      </GraphBar>
      <GraphBar
      rate={mbtiData.mbtiData.scoreFT / 4}
      leftName='감정형' rightName='사고형'
      leftEngName='feeling' rightEngName='thinking'>
      </GraphBar>
      <GraphBar
      rate={mbtiData.mbtiData.scoreJP / 4}
      leftName='계획형' rightName='탐색형'
      leftEngName='judging' rightEngName='prospecting'> 
      </GraphBar>
    </div>
  );
};



// 본캐부캐 컴포넌트
const MBTITestResultSecond = ({ mbti, secondMbti }) => {
  const [mbtiKeywords, setMbtiKeywords] = useState(mbtiData);
  console.log(mbtiKeywords);
  console.log('mbti: ', mbti);
  console.log('secondMbti: ', secondMbti);

  return (
    <div className="mbti-test-result-second-container">
      <div className='mbti-test-result-fs'>나의 본캐, 부캐 MBTI</div>
      <div className="mbti-test-result-second">
        <div className="first-mbti">
          <div className="first-mbti-type">{mbti}</div> {/* 1순위 결과값 */}
          <div className="first-mbti-keyword1">{mbtiKeywords[mbti].keywords.keyword1}</div>
          <div className="first-mbti-keyword2">{mbtiKeywords[mbti].keywords.keyword2}</div>
          <div className="first-mbti-keyword3">{mbtiKeywords[mbti].keywords.keyword3}</div>
        </div>
        <div className="logo-icon-result">
          <img src="/public-img/img-testresult.png" alt="myMbti"/>
        </div>
        <div className="second-mbti">
          <div className="second-mbti-type">{secondMbti}</div> {/* 2순위 결과값 */}
          <div className="second-mbti-keyword1">{mbtiKeywords[secondMbti].keywords.keyword1}</div>
          <div className="second-mbti-keyword2">{mbtiKeywords[secondMbti].keywords.keyword2}</div>
          <div className="second-mbti-keyword3">{mbtiKeywords[secondMbti].keywords.keyword3}</div>
        </div>
      </div>
    </div>
  );
};


// 네비게이션 컴포넌트

const NavigateSection = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MBTI 커뮤니티',
        text: '본격 MBTI 커뮤니티!',
        url: window.location.href,
      })
      .then(() => console.log('공유 성공'))
      .catch((error) => console.log('공유 실패', error));
    } else {
      console.log('Web Share API가 지원되지 않습니다.');
    }
  };
  /* 공유하기 기능 추후 수정 */

  return (
    <div className="button-section">
        <div className="button-box">
            <button className="navigate-button" 
            onClick={() => navigate('/TestMain')}>
              <img src="/public-img/logo-retry(pink).png" alt="retry"/></button>
            <button className="navigate-button" 
            onClick={() => navigate('/')}>
              <img src="/public-img/logo-home(pink).png" alt="home"/></button>
            <KakaoShare></KakaoShare>
            {/* <button className="navigate-button" 
            onClick={handleShare}>
          <img src="/public-img/logo-share(pink).png" alt="share"/></button> */}
        </div>
    </div>
  );
};


// 앱 컴포넌트
const TestResult = () => {
  const { state } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [testResult, setTestResult] = useState({data:{mbti:'임시값'}});

  useEffect(() => {
    sendGetLastTestResultRequest(state, setIsLoading, setTestResult);
  }, []);

  console.log('TestResult 렌더링');
  return (
    <div className="app">
      <AppContainerComponent />
      <HeaderComponent />
      {isLoading ? <div></div> : <MBTITestResult mbti = {testResult.data.mbti}/>}
      {isLoading ? <div></div> : <MBTIFeature 
        mbti={testResult.data.mbti} 
        description={mbtiData[testResult.data.mbti].description} 
      />}
      <Line />
      <GraphTitle />
      <MBTITestResultPercent mbtiData = {testResult.data}/>
      <Line />
      {isLoading ? <div></div> : <MBTITestResultSecond mbti={testResult.data.mbti} secondMbti={testResult.data.secondMbti} />}
      <Line />
      <NavigateSection />
    </div>
  );
};

export default TestResult;