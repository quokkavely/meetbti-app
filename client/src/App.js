import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TestMain from './pages/TestMain';
import LoginPage from './pages/loginpage/LoginPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import MbtiTestPage from './pages/mbti-test/MbtiTestPage';
// import TestResult from './pages/TestResult';
// import LoginMainPage from './pages/LoginMainPage';
// import ResultWaiting from './pages/ResultWaiting';
// import MBTIBoard from './pages/MBTIBoard';
// import RegistPostPage from './pages/RegistPostPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/testmain" element={<TestMain />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/mbti-test' element={<MbtiTestPage/>}/>
        {/* <Route path="/resultwaiting" element={<ResultWaiting />} />
        <Route path="/testresult" element={<TestResult />} />
        <Route path="/loginmain" element={<LoginMainPage />} />
        <Route path="/mbtiboard" element={<MBTIBoard />} />
        <Route path="/registpost" element={<RegistPostPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;