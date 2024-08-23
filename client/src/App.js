import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

/* 메인페이지 */
import MainPage from './pages/MainPage';
import LoginMainPage from './pages/MainPage_Login';

/* 로그인 관련 */
import LoginPage from './pages/mbti-test/login/LoginPage';
import RegistrationPage from './pages/registration/RegistrationPage';

/* MBTI 테스트 */
import TestMain from './pages/mbti-test/TestMain';
import ResultWaiting from './pages/mbti-test/ResultWaiting';
import TestResult from './pages/mbti-test/TestResult';
import MbtiTestPage from './pages/mbti-test/MbtiTestPage';

/* MBTI 게시판 */
import MBTIBoard from './pages/mbti-board/MBTIBoard';
import RegistPost from './pages/mbti-board/RegistPost';
import PostPage from './pages/mbti-board/PostPage';

/* 스낵게임 */
import SnackMain from './pages/snack/SnackMain';
import ImageGamePage from './pages/snack/ImageGamePage';
import ImageGameRegistration from './pages/snack/ImageGameRegistration';
import ImageGameMain from './pages/snack/ImageGameMain';
import BalanceGameRegist from './pages/snack/BalanceGameRegist';
import BalanceGameMain from './pages/snack/BalanceGameMain';
import BalanceGamePost from './pages/snack/BalanceGamePost';
import MbtmiPage from './pages/snack/MbtmiPage';

/* 마이페이지 */
import MyPage from './pages/mypage/MyPage';
import MyPageModify from './pages/mypage/MyPageModify';
import MyPageHistory from './pages/mypage/MyPageHistory';
import MyMBTIHistory from './pages/mypage/MyMBTIHistory';
import MyPostHistory from './pages/mypage/MyPostHistory';
import MyCommentHistory from './pages/mypage/MyCommentHistory';
import MyHeartHistory from './pages/mypage/MyHeartHistory';
import MySnackHistory from './pages/mypage/MySnackHistory';

/* 관리자 */
import AdminPage from './pages/admin/AdminPage';
import ReportPage from './pages/report/ReportPage';
import ReportDetail from './pages/reportdetail/ReportDetail';



const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/testmain" element={<TestMain />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route path='/registration' element={<RegistrationPage/>}/>
          <Route path='/mbti-test' element={<MbtiTestPage/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path="/resultwaiting" element={<ResultWaiting />} />
          <Route path="/testresult" element={<TestResult />} />
          <Route path="/loginmain" element={<LoginMainPage />} />
          <Route path="/mbtiboard" element={<MBTIBoard />} />
          <Route path="/registpost" element={<RegistPost />} />
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
          <Route path="/balancegameregist" element={<BalanceGameRegist />} />
          <Route path="/balancegame" element={<BalanceGameMain />} />
          <Route path="/balancegamepost" element={<BalanceGamePost />} />
          <Route path="/imagegame" element={<ImageGameMain />} />
        </Routes>
      </BrowserRouter>  
    </AuthProvider>
  );
};

export default App;