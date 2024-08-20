import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TestMain from './pages/TestMain';
import LoginPage from './pages/loginpage/LoginPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import MbtiTestPage from './pages/mbti-test/MbtiTestPage';
import AdminPage from './pages/admin/AdminPage';
import TestResult from './pages/TestResult';
import LoginMainPage from './pages/LoginMainPage';
import ResultWaiting from './pages/ResultWaiting';
import MBTIBoard from './pages/MBTIBoard';
import RegistPostPage from './pages/RegistPostPage';
import PostPage from './pages/PostPage';
import ReportPage from './pages/report/ReportPage';
import ReportDetail from './pages/reportdetail/ReportDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/testmain" element={<TestMain />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/mbti-test' element={<MbtiTestPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path="/resultwaiting" element={<ResultWaiting />} />
        <Route path="/testresult" element={<TestResult />} />
        <Route path="/loginmain" element={<LoginMainPage />} />
        <Route path="/mbtiboard" element={<MBTIBoard />} />
        <Route path="/registpost" element={<RegistPostPage />} />
        <Route path="/postpage" element={<PostPage />} />
        <Route path='/report' element={<ReportPage/>}/>
        <Route path='/report-detail' element={<ReportDetail/>}/>
      </Routes>
    </BrowserRouter>  
  );
};

export default App;