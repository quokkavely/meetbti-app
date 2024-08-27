import React from 'react';
import './TestMain.css';
import { useNavigate } from 'react-router-dom';

const TestMainContent = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <div className="left-container">
        <div className="rolling-container rolling-down">
          <div className="image-block">
            <img src="/mbti-img/ENFJ.png" alt="Image 1" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ENFP.png" alt="Image 2" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ENTJ.png" alt="Image 3" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ENTP.png" alt="Image 4" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ESFJ.png" alt="Image 5" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ESFP.png" alt="Image 6" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ESTJ.png" alt="Image 7" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ESTP.png" alt="Image 8" />
          </div>
        </div>
      </div>
      <div className="right-container">
       <div className="back-button"> 
        <img
            src="/public-img/back(grey).png"
            alt="back"
            className="backButton"
            onClick={() => window.history.back()}
        />
        </div>
        <div className="rolling-container rolling-up">
          <div className="image-block">
            <img src="/mbti-img/INFP.png" alt="Image 8" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/INFJ.png" alt="Image 7" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/INTP.png" alt="Image 6" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/INTJ.png" alt="Image 5" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ISFP.png" alt="Image 4" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ISFJ.png" alt="Image 3" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ISTJ.png" alt="Image 2" />
          </div>
          <div className="image-block">
            <img src="/mbti-img/ISTP.png" alt="Image 1" />
          </div>
        </div>
      </div>
      <button className="mbti-button" onClick={() => navigate('/mbti-test')}>MBTI TEST</button>
    </div>
  );
}

const TestMain = () => {
  return (
    <div className="app">
      <TestMainContent />
    </div>
  );
};

export default TestMainContent;
