import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PostPage.css';

// 컴포넌트 임포트
import UserInfoContainer from '../../components/user_info_container/UserInfoContainer';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import CommentUserInfoContainer from '../../components/user_info_container/CommentUserInfoContainer';
import AlertModal from '../../components/modal/AlertModal';
import sendGetSinglePostsRequest from '../../requests/GetSinglePostRequest';
import { useAuth } from '../../auth/AuthContext';
import sendPostCommentRequest from '../../requests/PostCommentRequest';
import sendGetMyinfoRequest from '../../requests/GetMyInfo';
import sendPostHeartRequest from '../../requests/PostHeartRequest';
import sendReportPostRequest from '../../requests/ReportPostRequest';
import sendDeletePostRequest from '../../requests/DeletePostRequest';

// 포스트 컨텐츠 컴포넌트
const PostPageContent = ({ post }) => {
  return (
    <div className="post-page-content">
      <div className="post-title">{post.title}</div>
      <div className="post-meta">
        <span>{post.createdAt}</span>
        <span>조회 {post.viewCount}</span>
        {/* <span>❤️ {post.heartCount}</span> 
        <span>💬 {post.comments.length}</span>  */}
      </div>
      {post.image !== null && <img src={post.image} alt="post" className="post-image" />}
      <div className="post-text">{post.content}</div>
    </div>
  );
};


// 포스트 액션 컴포넌트
const PostActions = ({ state, navigate, postId, postAuthor, username, myMbti, likes, propsliked, setLoading, setPostData }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(propsliked);
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
    sendPostHeartRequest(state, postId, 'posts');
  };

  const handleAlert = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRadioChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const handleReport = () => {
    /* console.log('신고 사유:', selectedReason); */
    sendReportPostRequest(state, postId, selectedReason);
    alert('신고가 접수되었어요')
    closeModal();
  };
  const isReportable = () => {
    console.log('postAuthor: ', postAuthor);
    console.log('username: ', username);
    if(postAuthor === username || postAuthor === '관리자' || postAuthor === '운영자'){
      return false;
    }
    return true;
  }

  return (
    <div>
      <div className="post-actions">
        <button
          className="like-button"
          onClick={handleLike}
          style={{ backgroundColor: liked ? '#e3ccf6' : '#ccc' }}
        >
          ❤️ 좋아요 {likeCount}
        </button>
        {isReportable() && <button className="alert-button-main" onClick={handleAlert}>
          <img src="public-img/alert-img.png" alt="신고하기" />
        </button>}
        <AlertModal
          showModal={showModal}
          closeModal={closeModal}
          handleRadioChange={handleRadioChange}
          handleReport={handleReport}
          selectedReason={selectedReason}
        />
      </div>
      {postAuthor === username && <div className='post-modify-container'>
        <button className='post-modify-button' onClick={() => navigate(`/registPost?postId=${postId}&action=modify`)}>수정</button>
        <button className='post-modify-button' onClick={() => {
          if(window.confirm('게시글을 삭제하시겠어요?')){
            sendDeletePostRequest(state, myMbti, postId, navigate);
          }
          }}>삭제</button>
      </div>}
    </div>
  );
};


// 댓글 개수 컴포넌트
const CommentCount = ({ comments }) => {
  return (
    <div className="comment-count">
      <span>댓글 {comments.toLocaleString()}개</span>
    </div>
  );
};


// CommentItem 컴포넌트 정의
const CommentItem = ({ username, mbti, content, createdAt, postAuthor }) => {
  return (
    <div className="comments">
      <div className="comment-section">
        <CommentUserInfoContainer username={username} mbti={mbti}/>
      </div>
      <div className="comment-content">
        <div className="comment-text" style={{color: username === postAuthor ? '#a155d3' : 'black'}}>{content}</div>
        <div className="comment-time">{createdAt}</div>
      </div>
      {/* <div className="comment-subcontent ">
        <div>❤️ {likes.toLocaleString()}</div>
      </div> */}
    </div>
  );
};

// 댓글 섹션 컴포넌트
const CommentSection = ({ comments, postAuthor }) => {
  console.log(comments);

  return (
    <div className="comment-section">
      {comments.map(comment => (
        <CommentItem 
          username={comment.nickName} 
          mbti={comment.mbti} 
          content={comment.content} 
          createdAt={comment.createdAt} 
          postAuthor = {postAuthor}
          // likes={comment.likes} 
        />
      ))}
    </div>
  );
};

// 댓글 입력 컴포넌트
const CommentInput = ({ state, postId, setLoading, setPostData}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    /* console.log(e.target.value); */
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    // 댓글 전송 로직 추가
    if(inputValue === ''){
      alert('댓글 내용을 입력해주세요');
      return;
    }
    sendPostCommentRequest(state, postId, inputValue, setInputValue, ()=> sendGetSinglePostsRequest(state, postId, setLoading, setPostData));
  };

  return (
    <div className="comment-input">
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleInputChange} 
        placeholder="댓글을 입력하세요..."
        className="comment-input-field"
      />
      <div className="comment-send-button" onClick={handleSend}>
        <img src="public-img/send-img.png" alt="댓글 보내기"/>
      </div>
    </div>
  );
};



const PostPage = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});
  const [myData, setMyData] = useState({data:{}});

  useEffect(() => {
    sendGetMyinfoRequest(state, setMyData);
    sendGetSinglePostsRequest(state, params.get('postId'), setLoading, setPostData);
  }, [state]);

  return (
    <div className="app">
      <AppContainer />
      <Header />
      {!loading && <UserInfoContainer author = {postData.data.nickName} mbti = {postData.data.mbti}/>}
      {!loading && <PostPageContent post={postData.data} />}
      {!loading && <PostActions state={state} navigate={navigate} postId={postData.data.postId} postAuthor={postData.data.nickName} username={myData.data.nickname} myMbti={myData.data.mbti} likes={postData.data.heartCount} propsliked = {postData.data.liked} setLoading = {setLoading} setPostData={setPostData}/>}
      {!loading && <CommentCount comments={postData.data.comments.length} />}
      {!loading && <CommentSection comments={postData.data.comments} postAuthor = {postData.data.nickName}/>}
      {!loading && <CommentInput state = {state} postId = {postData.data.postId} setLoading={setLoading} setPostData={setPostData}/>}
    </div>
  );
};

export default PostPage;