import React, { useState } from 'react';
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
import ImageGameRegistration from './pages/imagegame_registration/ImageGameRegistration';
import MbtmiPage from './pages/mbtmi/MbtmiPage';
import ImageGamePage from './pages/imagegame/ImageGamePage';
import MyPage from './pages/MyPage';
import MyPageModify from './pages/MyPageModify';
import MyPageHistory from './pages/MyPageHistory';
import MyMBTIHistory from './pages/MyMBTIHistory';
import MyPostHistory from './pages/MyPostHistory';
import MyCommentHistory from './pages/MyCommentHistory';
import MyHeartHistory from './pages/MyHeartHistory';
import MySnackHistory from './pages/MySnackHistory';
import SnackMain from './pages/SnackMain';
import RegistBalanceGame from './pages/RegistBalanceGame';
import BalanceGameMain from './pages/BalanceGameMain';
import BalanceGamePost from './pages/BalanceGamePost';
import ImageGameMain from './pages/ImageGameMain';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage loggedIn = {loggedIn}/>} />
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
        <Route path='/imagegame-registration' element={<ImageGameRegistration/>}/>
        <Route path='/mbtmi' element={<MbtmiPage/>}/>
        <Route path='/imagegame-detail' element={<ImageGamePage/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/mypagemodify' element={<MyPageModify/>}/>
        <Route path='/mypagehistory' element={<MyPageHistory/>}/>
        <Route path='/mymbtihistory' element={<MyMBTIHistory/>}/>
        <Route path='/myposthistory' element={<MyPostHistory/>}/>
        <Route path='/mycommenthistory' element={<MyCommentHistory/>}/>
        <Route path='/myhearthistory' element={<MyHeartHistory/>}/>
        <Route path='/mysnackhistory' element={<MySnackHistory/>}/> 
        <Route path="/snackmain" element={<SnackMain />} />
        <Route path="/registbalancegame" element={<RegistBalanceGame />} />
        <Route path="/balancegame" element={<BalanceGameMain />} />
        <Route path="/balancegamepost" element={<BalanceGamePost />} />
        <Route path="/imagegame" element={<ImageGameMain />} />
      </Routes>
    </BrowserRouter>  
  );
};

export default App;