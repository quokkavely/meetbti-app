import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import TestMain from './pages/TestMain';
import TestResult from './pages/TestResult';
import LoginMainPage from './pages/LoginMainPage';
import ResultWaiting from './pages/ResultWaiting';
import MBTIBoard from './pages/MBTIBoard';
import RegistPostPage from './pages/RegistPostPage';
import PostPage from './pages/PostPage';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/testmain" element={<TestMain />} />
        <Route path="/resultwaiting" element={<ResultWaiting />} />
        <Route path="/testresult" element={<TestResult />} />
        <Route path="/loginmain" element={<LoginMainPage />} />
        <Route path="/mbtiboard" element={<MBTIBoard />} />
        <Route path="/registpost" element={<RegistPostPage />} />
        <Route path="/postpage" element={<PostPage />} />
      </Routes>
  );
};

export default App;