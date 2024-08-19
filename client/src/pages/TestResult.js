import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestResult.css';


// 헤더(로고, 뒤로가기) 컴포넌트
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-box">
        <div className='logo-img' onClick={() => navigate('/')}>
          <img src="/Main-logo.png" alt='메인로고'/>
        </div>
        <div className="back-icon" onClick={() => navigate('/TestMain')}>
          <img src="back(grey).png" alt='뒤로 가기' />
        </div>
      </div>
      <div className="logo-text">
        <h1>본격 MBTI 커뮤니티!</h1>
      </div>
    </header>
  );
};



// MBTI 테스트 컴포넌트
const MBTITestResult = () => {
  return (
    <div className="ResultImg">
      <img src="result.png" alt="Test Result" className="mbti-test-result-image"/>
    </div>
  )
};

const MBTIFeature = () => {
  return (
    <div className="mbti-feature">
        <div className="mbti-feature-title-box">
          <div className="mbti-type">INFJ</div>
          <div className="mbti-feature-title"> 성격 특징 </div>
        </div>
        <div className="mbti-feature-content">특징 설명 솰라솰라. 어떻게 하면 이 데이터를 가져올 수 있을까요? 그림으로 가져올까요, 텍스트로 가져올까요? </div>
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


// 그래프 컴포넌트
const MBTITestResultPercent = () => {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    /* 데이터를 받아오는 함수 */
    const fetchData = async () => {
      try {
        /* const response = await fetch('/mbti-test'); /* 백엔드에서 데이터를 받아오는 API 엔드포인트 */
         // 여기에 실제 API 엔드포인트를 사용하세요.
        const response = await fetch('https://your-api-endpoint.com/mbti-data');
        const data = await response.json();
        setGraphData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!graphData) {
    return (
      <div className="mbti-graph-container">
        <div className="mbti-graph-row">
          <div className="mbti-graph-label">
            <div className="graph-label">72%</div>
            <div className="graph-text">외향형</div>
          </div>
          <div className="mbti-graph-bar-container">
            <div className="mbti-graph-bar extraverted" style={{ width: '72%' }}></div>
            <div className="mbti-graph-bar introverted" style={{ width: '28%' }}></div>
          </div>
          <div className="mbti-graph-label">
            <div className="graph-label">28%</div>
            <div className="graph-text">내향형</div>
          </div>
        </div>

        <div className="mbti-graph-row">
          <div className="mbti-graph-label">
            <div className="graph-label">64%</div>
            <div className="graph-text">직관형</div>
          </div>
          <div className="mbti-graph-bar-container">
            <div className="mbti-graph-bar intuitive" style={{ width: '64%' }}></div>
            <div className="mbti-graph-bar observant" style={{ width: '36%' }}></div>
          </div>
          <div className="mbti-graph-label">
            <div className="graph-label">36%</div>
            <div className="graph-text">현실주의형</div>
          </div>
        </div>

        <div className="mbti-graph-row">
          <div className="mbti-graph-label">
            <div className="graph-label">57%</div>
            <div className="graph-text">이성적사고형</div>
          </div>
          <div className="mbti-graph-bar-container">
            <div className="mbti-graph-bar thinking" style={{ width: '57%' }}></div>
            <div className="mbti-graph-bar feeling" style={{ width: '43%' }}></div>
          </div>
          <div className="mbti-graph-label">
            <div className="graph-label">43%</div>
            <div className="graph-text">원칙주의형</div>
          </div>
        </div>

        <div className="mbti-graph-row">
          <div className="mbti-graph-label">
            <div className="graph-label">68%</div>
            <div className="graph-text">계획형</div>
          </div>
          <div className="mbti-graph-bar-container">
            <div className="mbti-graph-bar judging" style={{ width: '68%' }}></div>
            <div className="mbti-graph-bar prospecting" style={{ width: '32%' }}></div>
          </div>
          <div className="mbti-graph-label">
            <div className="graph-label">32%</div>
            <div className="graph-text">탐색형</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mbti-graph-container">
       <div className="mbti-graph-row">
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.mind.extraverted}%</div>
          <div className="graph-text">외향형</div>
        </div>
        <div className="mbti-graph-bar-container">
          <div className="mbti-graph-bar extraverted" style={{ width: `${graphData.mind.extraverted}%` }}></div>
          <div className="mbti-graph-bar introverted" style={{ width: `${graphData.mind.introverted}%` }}></div>
        </div>
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.mind.introverted}%</div>
          <div className="graph-text">내향형</div>
        </div>
      </div>

      <div className="mbti-graph-row">
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.energy.intuitive}%</div>
          <div className="graph-text">직관형</div>
        </div>
        <div className="mbti-graph-bar-container">
          <div className="mbti-graph-bar intuitive" style={{ width: `${graphData.energy.intuitive}%` }}></div>
          <div className="mbti-graph-bar observant" style={{ width: `${graphData.energy.observant}%` }}></div>
        </div>
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.energy.observant}%</div>
          <div className="graph-text">현실주의형</div>
        </div>
      </div>

      <div className="mbti-graph-row">
        
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.nature.thinking}%</div>
          <div className="graph-text">이성적사고형</div>
        </div>
        <div className="mbti-graph-bar-container">
          <div className="mbti-graph-bar thinking" style={{ width: `${graphData.nature.thinking}%` }}></div>
          <div className="mbti-graph-bar feeling" style={{ width: `${graphData.nature.feeling}%` }}></div>
        </div>
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.nature.feeling}%</div>
          <div className="graph-text">원칙주의형</div>
        </div>
      </div>

      <div className="mbti-graph-row">
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.tactics.judging}%</div>
          <div className="graph-text">계획형</div>
        </div>
        <div className="mbti-graph-bar-container">
          <div className="mbti-graph-bar judging" style={{ width: `${graphData.tactics.judging}%` }}></div>
          <div className="mbti-graph-bar prospecting" style={{ width: `${graphData.tactics.prospecting}%` }}></div>
        </div>
        <div className="mbti-graph-label">
          <div className="graph-label">{graphData.tactics.prospecting}%</div>
          <div className="graph-text">탐색형</div>
        </div>
      </div>
    </div>
    );
  };



// 본캐부캐 컴포넌트
const MBTITestResultSecond = ({ firstMbtiResult, secondMbtiResult }) => {
  const [firstKeywords, setFirstKeywords] = useState({ keyword1: '', keyword2: '', keyword3: '' });
  const [secondKeywords, setSecondKeywords] = useState({ keyword1: '', keyword2: '', keyword3: '' });

  // MBTI 타입에 따른 키워드를 설정하는 함수
  const fetchKeywords = (type) => {
    const keywordData = {
      ENFJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ENFP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ENTP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ENTJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ESTP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ESTJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ESFJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ESFP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      INFJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      INFP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      INTJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      INTP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ISTJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ISTP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ISFJ: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      ISFP: {keyword1: "외향형", keyword2: "내향형", keyword3: "직관형"},
      // 다른 MBTI 타입에 대한 키워드 추가
    };
    return keywordData[type] || { keyword1: '키워드1', keyword2: '키워드2', keyword3: '키워드3' };
  };

  useEffect(() => {
    // firstMbtiResult가 변경될 때마다 키워드를 업데이트
    if (firstMbtiResult) {
      setFirstKeywords(fetchKeywords(firstMbtiResult));
    }
  }, [firstMbtiResult]);

  useEffect(() => {
    // secondMbtiResult가 변경될 때마다 키워드를 업데이트
    if (secondMbtiResult) {
      setSecondKeywords(fetchKeywords(secondMbtiResult));
    }
  }, [secondMbtiResult]);

  return (
    <div className="mbti-test-result-second-container">
      <h2>나의 본캐, 부캐 MBTI</h2>
      <div className="mbti-test-result-second">
        <div className="first-mbti">
          <div className="first-mbti-type">{firstMbtiResult}</div> {/* 1순위 결과값 */}
          <div className="first-mbti-keyword1">{firstKeywords.keyword1}</div>
          <div className="first-mbti-keyword2">{firstKeywords.keyword2}</div>
          <div className="first-mbti-keyword3">{firstKeywords.keyword3}</div>
        </div>
        <div className="logo-icon">
          <img src="logo-icon.png" alt="myMbti"/>
        </div>
        <div className="second-mbti">
          <div className="second-mbti-type">{secondMbtiResult}</div> {/* 2순위 결과값 */}
          <div className="second-mbti-keyword1">{secondKeywords.keyword1}</div>
          <div className="second-mbti-keyword2">{secondKeywords.keyword2}</div>
          <div className="second-mbti-keyword3">{secondKeywords.keyword3}</div>
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
              <img src="logo-retry.png" alt="retry"/></button>
            <button className="navigate-button" 
            onClick={() => navigate('/')}>
              <img src="logo-home.png" alt="home"/></button>
            <button className="navigate-button" 
            onClick={handleShare}>
          <img src="logo-share.png" alt="share"/></button>
        </div>
    </div>
  );
};


// 앱 컴포넌트
const TestResult = () => {
  const [firstMbtiResult, setFirstMbtiResult] = useState('INFJ'); // 1순위 초기값 설정
  const [secondMbtiResult, setSecondMbtiResult] = useState('ENTP'); // 2순위 초기값 설정

  // 실제로는 API 호출 등을 통해 mbtiResult 값을 설정할 수 있습니다.
  useEffect(() => {
    // 예시로 setTimeout을 사용하여 2초 후에 결과값을 변경
    setTimeout(() => {
      setFirstMbtiResult('INFJ');
      setSecondMbtiResult('INFP');
    }, 1000);
  }, []);

  console.log('TestResult 렌더링');
  return (
    <div className="app">
      <Header />
      <MBTITestResult />
      <MBTIFeature />
      <Line />
      <GraphTitle />
      <MBTITestResultPercent />
      <Line />
      <MBTITestResultSecond firstMbtiResult={firstMbtiResult} secondMbtiResult={secondMbtiResult} />
      <Line />
      <NavigateSection />
    </div>
  );
};

export default TestResult;