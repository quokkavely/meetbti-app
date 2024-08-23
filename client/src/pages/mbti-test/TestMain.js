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
            <img src="redgirl.jpeg" alt="Image 1" />
          </div>
          <div className="image-block">
            <img src="snack-img1.jpeg" alt="Image 2" />
          </div>
          <div className="image-block">
            <img src="whitegirl.jpeg" alt="Image 3" />
          </div>
          <div className="image-block">
            <img src="snack-img2.jpeg" alt="Image 4" />
          </div>
          <div className="image-block">
            <img src="whitegirl.jpeg" alt="Image 5" />
          </div>
        </div>
      </div>
      <div className="right-container">
       <div className="back-button"> 
        <img
            src="back.png"
            alt="back"
            className="backButton"
            onClick={() => window.history.back()}
        />
        </div>
        <div className="rolling-container rolling-up">
          <div className="image-block">
            <img src="snack-img2.jpeg" alt="Image 5" />
          </div>
          <div className="image-block">
            <img src="whitegirl.jpeg" alt="Image 4" />
          </div>
          <div className="image-block">
            <img src="snack-img1.jpeg" alt="Image 3" />
          </div>
          <div className="image-block">
            <img src="redgirl.jpeg" alt="Image 2" />
          </div>
          <div className="image-block">
            <img src="whitegirl.jpeg" alt="Image 1" />
          </div>
        </div>
      </div>
      <button className="mbti-button" onClick={() => navigate('/mbti-test')}>MBTI 검사</button>
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
