import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MBTIBoard.css';
import sendGetPostsRequest from '../../requests/GetPostsRequest';
import { useAuth } from '../../auth/AuthContext';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';


// 헤더(로고, 뒤로가기) 컴포넌트
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="logo-box">
        <div className='logo-img' onClick={() => navigate('/')}>
          <img src="public-img/Main-logo.png" alt='메인로고'/>
        </div>
        <div className="back-icon" onClick={() => navigate(-1)}>
          <img src="public-img/back(grey).png" alt='뒤로 가기' />
        </div>
      </div>
      <div className="logo-text">
        <h1>본격 MBTI 커뮤니티!</h1>
      </div>
    </header>
  );
};

// 필터 컴포넌트
const Filter = () => {
    const [isMBTIDropdownOpen, setMBTIDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);

    const toggleMBTIDropdown = () => {
        setMBTIDropdownOpen(!isMBTIDropdownOpen);
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!isSortDropdownOpen);
    };

    return (
        <div className="filter">
            <div className="dropdown">
                <button className="filter-btn" onClick={toggleMBTIDropdown}>▼ INFJ</button>
                {isMBTIDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item">ALL</button>
                        <button className="dropdown-item">ENTJ</button>
                        <button className="dropdown-item">ENTP</button>
                        <button className="dropdown-item">ENFJ</button>
                        <button className="dropdown-item">ENFP</button>
                        <button className="dropdown-item">ESTJ</button>
                        <button className="dropdown-item">ESTP</button>
                        <button className="dropdown-item">ESFJ</button>
                        <button className="dropdown-item">ESFP</button>
                        <button className="dropdown-item">INTJ</button>
                        <button className="dropdown-item">INTP</button>
                        <button className="dropdown-item">INFJ</button>
                        <button className="dropdown-item">INFP</button>
                        <button className="dropdown-item">ISTJ</button>
                        <button className="dropdown-item">ISTP</button>
                        <button className="dropdown-item">ISFJ</button>
                        <button className="dropdown-item">ISFP</button>
                    </div>
                )}
            </div>
            <div className="dropdown">
                <button className="filter-btn" onClick={toggleSortDropdown}>▼ 최신순</button>
                {isSortDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item">최신순</button>
                        <button className="dropdown-item">인기순</button>
                        <button className="dropdown-item">조회순</button>
                        <button className="dropdown-item">댓글많은순</button>
                    </div>
                )}
            </div>
        </div>
    );
};

// 포스트 컴포넌트
const dummyData = [
    { title: "경범이는 치와와", views: 24200, likes: 2234, comments: 3254 },
    { title: "원일이의 은밀한 사생활 썰 푼다.", views: 97245, likes: 9999, comments: 9999 },
    { title: "광희랑 민준이랑 구글 갔냐?", views: 92, likes: 1, comments: 23 },
    { title: "(실시간) 경범이 제주도 대저택 사진", views: 42875, likes: 4234, comments: 5254 },
    { title: "럭키, 바닐라, 라떼는 사실...", views: 3855, likes: 271, comments: 2872 },
    { title: "프로젝트 원래 이렇게 힘든거냐 ㅠㅠ", views: 74207, likes: 6754, comments: 7735 },
];

// 게시판 컴포넌트
const Board = () => {
    const navigate = useNavigate();
    

    return (
        <div className="board">
            <div className="posts">
                {dummyData.map((post, index) => (
                    <div key={index} className="post-item">
                        <div className="post-title" onClick={() => navigate(`/postpage`)}>{post.title}</div>
                        <div className="post-info">
                            <span>조회 {post.views.toLocaleString()}</span>
                            <span>❤️ {post.likes.toLocaleString()}</span>
                            <span>💬 {post.comments.toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// 글쓰기 버튼 컴포넌트
const WriteButton = (props) => {
    const navigate = useNavigate();
    return (
        <div className="write-section">
            <button className="write-btn" onClick={() => {
                if(props.category === 'NONE' || props.category === 'ALL'){
                    alert('글쓰기 권한이 없어요');
                    return;
                }
                navigate(`/registPost?category=${props.category}`);
                }}>글쓰기</button>
        </div>
    );
};


// 페이지 네이션 컴포넌트
const PageNation = () => {
    return (
        <div className="pagination">
                <button className="previous-page">{"<"}</button>
                {[1, 2, 3, 4, 5].map((num) => (
                    <button key={num} className="page-number">{num}</button>
                ))}
                <button className="next-page">{">"}</button>
            </div>
    );
};


// 게시판 페이지 컴포넌트
const MBTIBoard = () => {
    const { state } = useAuth();
    const navigate = useNavigate();
    const [myData, setMyData] = useState({data:{mbti:'ALL'}});
    const [category, setCategory] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState({data:[]});

    useEffect(() => {
        sendGetMyinfoRequest(state, setMyData);
        sendGetPostsRequest(state, 1, 6, myData.data.mbti, 'createdAt', setLoading, setPosts);
    }, []);
    
    return (
      <div className="app">
        <Header />
        <Filter />
        <Board />
        <WriteButton category={myData.data.mbti}/>
        <PageNation />
      </div>
    );
  };
  
  export default MBTIBoard;
