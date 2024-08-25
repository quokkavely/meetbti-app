import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MBTIBoard.css';
import sendGetPostsRequest from '../../requests/GetPostsRequest';
import { useAuth } from '../../auth/AuthContext';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';


// 헤더(로고, 뒤로가기) 컴포넌트
const AppContainerComponent = () => {
    return (
        <AppContainer />
    );
  };
  
  const HeaderComponent = () => {
    return (
        <Header />
    );
  };


// 필터 컴포넌트
const Filter = ({ setSortOption, setMbtiType, mbtiType, sortOption }) => {
    const [isMBTIDropdownOpen, setMBTIDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);

    const toggleMBTIDropdown = () => {
        setMBTIDropdownOpen(!isMBTIDropdownOpen);
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!isSortDropdownOpen);
    };

    const closeDropdowns = () => {
        setMBTIDropdownOpen(false);
        setSortDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                closeDropdowns();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSortOptionClick = (option) => {
        setSortOption(option);
        closeDropdowns();
    };

    const handleMbtiTypeClick = (type) => {
        setMbtiType(type);
        closeDropdowns();
    };

    const sortOptionText = {
        createdAt: '최신순',
        popularity: '인기순',
        views: '조회순',
        comments: '댓글많은순'
    };

    return (
        <div className="filter">
            <div className="dropdown">
                <button className="filter-btn" onClick={toggleMBTIDropdown}>▼ {mbtiType}</button>
                {isMBTIDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ALL')}>ALL</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ENTJ')}>ENTJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ENTP')}>ENTP</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ENFJ')}>ENFJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ENFP')}>ENFP</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ESTJ')}>ESTJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ESTP')}>ESTP</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ESFJ')}>ESFJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ESFP')}>ESFP</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('INTJ')}>INTJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('INTP')}>INTP</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('INFJ')}>INFJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('INFP')}>INFP</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ISTJ')}>ISTJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ISTP')}>ISTP</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ISFJ')}>ISFJ</button>
                        <button className="dropdown-item" onClick={() => handleMbtiTypeClick('ISFP')}>ISFP</button>
                    </div>
                )}
            </div>
            <div className="dropdown">
                <button className="filter-btn" onClick={toggleSortDropdown}>▼ {sortOptionText[sortOption]}</button>
                {isSortDropdownOpen && (
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => handleSortOptionClick('createdAt')}>최신순</button>
                        <button className="dropdown-item" onClick={() => handleSortOptionClick('popularity')}>인기순</button>
                        <button className="dropdown-item" onClick={() => handleSortOptionClick('views')}>조회순</button>
                        <button className="dropdown-item" onClick={() => handleSortOptionClick('comments')}>댓글많은순</button>
                    </div>
                )}
            </div>
        </div>
    );
};


// 게시판 컴포넌트
const Board = ({ props, sortOption, mbtiType, setTotalPages }) => {
    const { state } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState({data:[]});
    const [myData, setMyData] = useState({data:{mbti:'ALL'}});

    useEffect(() => {
        sendGetMyinfoRequest(state, (myData) => {
            sendGetPostsRequest(state, 1, 6, mbtiType, sortOption, setLoading, (data) => {
                setPosts(data);
                setTotalPages(data.totalPages); // 총 페이지 수 설정
            });
        });
    }, [sortOption, mbtiType]);

    if (loading) {
        return <div> 게시판 불러오는 중...</div>;
    }

    return (
        <div className="board">
            <div className="posts">
                {!props.loading && props.posts.map((post, index) => (
                    <div key={index} className="post-item">
                        <div className="post-title" onClick={() => navigate(`/postpage`)}>{post.title}</div>
                        <div className="post-info">
                            <span>조회 {post.views.toLocaleString()}</span>
                            <span>❤️ {post.likes.toLocaleString()}</span>
                            <span>💬 {post.comments.toLocaleString()}</span>
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
const PageNation = ({ totalPages }) => {
    const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <button className="previous-page">{"<"}</button>
            {pages.map((num) => (
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
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [sortOption, setSortOption] = useState('createdAt');
    const [mbtiType, setMbtiType] = useState('ALL');
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        sendGetMyinfoRequest(state, setMyData);
        sendGetPostsRequest(state, 1, 6, params.get('category'), 'createdAt', sortOption, setLoading, setPosts);
    }, []);
    
    return (
        <div className="app">
          <AppContainerComponent />
          <HeaderComponent />
          <Filter setSortOption={setSortOption} setMbtiType={setMbtiType} mbtiType={mbtiType} sortOption={sortOption} />
          <Board loading = {loading} posts = {posts.data} sortOption={sortOption} mbtiType={mbtiType} setTotalPages={setTotalPages} />
          <WriteButton category={myData.data.mbti} />
          <PageNation totalPages={totalPages} />
        </div>
    );
  };
  
  export default MBTIBoard;
