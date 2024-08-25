import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MBTIBoard.css';
import sendGetPostsRequest from '../../requests/GetPostsRequest';
import { useAuth } from '../../auth/AuthContext';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';
import { useRef } from 'react';


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
const Filter = (props) => {
    const [isMBTIDropdownOpen, setMBTIDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
    const mbtiDropdownRef = useRef(null);
    const sortDropdownRef = useRef(null);

    const toggleMBTIDropdown = () => {
        setMBTIDropdownOpen(!isMBTIDropdownOpen);
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!isSortDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if(mbtiDropdownRef.current && !mbtiDropdownRef.current.contains(event.target)){
            setMBTIDropdownOpen(false);
        }
        if(sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)){
            setSortDropdownOpen(false);
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    const selectOption = (option) => {
        props.navigate(`/MBTIBoard?category=${option}`);
        setMBTIDropdownOpen(false);
        props.setFilterBy(option);
    }

    return (
        <div className="filter">
            <div className="dropdown" ref={mbtiDropdownRef}>
                <button className="filter-btn" onClick={toggleMBTIDropdown}>{`▼ ${props.filterBy}`}</button>
                {isMBTIDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => selectOption('ALL')}>ALL</button>
                        <button className="dropdown-item" onClick={() => selectOption('ENTJ')}>{props.myMbti === 'ENTJ' ? 'ENTJ (me)' : 'ENTJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ENTP')}>{props.myMbti === 'ENTP' ? 'ENTP (me)' : 'ENTP'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ENFJ')}>{props.myMbti === 'ENFJ' ? 'ENFJ (me)' : 'ENFJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ENFP')}>{props.myMbti === 'ENFP' ? 'ENFP (me)' : 'ENFP'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ESTJ')}>{props.myMbti === 'ESTJ' ? 'ESTJ (me)' : 'ESTJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ESTP')}>{props.myMbti === 'ESTP' ? 'ESTP (me)' : 'ESTP'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ESFJ')}>{props.myMbti === 'ESFJ' ? 'ESFJ (me)' : 'ESFJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ESFP')}>{props.myMbti === 'ESFP' ? 'ESFP (me)' : 'ESFP'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('INTJ')}>{props.myMbti === 'INTJ' ? 'INTJ (me)' : 'INTJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('INTP')}>{props.myMbti === 'INTP' ? 'INTP (me)' : 'INTP'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('INFJ')}>{props.myMbti === 'INFJ' ? 'INFJ (me)' : 'INFJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('INFP')}>{props.myMbti === 'INFP' ? 'INFP (me)' : 'INFP'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ISTJ')}>{props.myMbti === 'ISTJ' ? 'ISTJ (me)' : 'ISTJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ISTP')}>{props.myMbti === 'ISTP' ? 'ISTP (me)' : 'ISTP'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ISFJ')}>{props.myMbti === 'ISFJ' ? 'ISFJ (me)' : 'ISFJ'}</button>
                        <button className="dropdown-item" onClick={() => selectOption('ISFP')}>{props.myMbti === 'ISFP' ? 'ISFP (me)' : 'ISFP'}</button>
                    </div>
                )}
            </div>
            <div className="dropdown" ref={sortDropdownRef}>
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
const Board = (props) => {
    const navigate = useNavigate();
    return (
        <div className="board">
            <div className="posts">
                {!props.loading && props.posts.map((post, index) => (
                    <div key={index} className="post-item">
                        <div className="post-title" onClick={() => navigate(`/postpage?postId=${post.postId}`)}>{post.title}</div>
                        <div className="post-info">
                            <span>조회 {post.viewCount}</span>
                            <span>❤️ {post.heartCount}</span>
                            <span>💬 {post.comments.length}</span>
                        </div>
                    </div>
                ))}
                {props.posts.length === 0 && <div>작성된 게시글이 없어요.</div>}
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
                if(props.category === 'NONE'){
                    if(window.confirm('MBTI가 없어요. 첫 테스트를 진행하시겠어요?')){
                        navigate('/mbti-test');
                    };
                    return;
                }
                if(props.params.get('category') !== props.category){
                    alert('다른 MBTI게시판에는 게시글을 등록할 수 없어요');
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
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState({data:[]});
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const updateMyData = (data)=> {
        setMyData(data);
        if(category === ''){
            setCategory(data.data.mbti === 'NONE' ? 'ALL' : data.data.mbti);
        }
    }

    useEffect(() => {
        let param = params.get('category');
        if(param === 'NONE'){
            param = 'ALL';
        }
        sendGetMyinfoRequest(state, updateMyData);
        sendGetPostsRequest(state, 1, 6, param, 'createdAt', setLoading, setPosts);
    }, [category]);
    
    return (
      <div className="app">
        <Header />
        <Filter navigate = {navigate} filterBy = {category} setFilterBy = {setCategory} myMbti = {myData.data.mbti}/>
        <Board loading = {loading} posts = {posts.data}/>
        <WriteButton category={myData.data.mbti} params = {params}/>
        <PageNation />
      </div>
    );
  };
  
  export default MBTIBoard;
