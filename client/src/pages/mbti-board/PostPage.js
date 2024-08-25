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

// 포스트 컨텐츠 컴포넌트
const PostPageContent = ({ post }) => {
  return (
    <div className="post-page-content">
      <div className="post-title">{post.title}</div>
      <div className="post-meta">
        <span>{post.createdAt}</span>
        <span>조회 {post.viewCount}</span>
        <span>❤️ {post.heartCount}</span> 
        <span>💬 {post.comments.length}</span> 
      </div>
      {post.image !== null && <img src={post.image} alt="post" className="post-image" />}
      <div className="post-text">{post.content}</div>
    </div>
  );
};


// 포스트 액션 컴포넌트
const PostActions = ({ likes }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
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
    console.log('신고 사유:', selectedReason);
    closeModal();
  };

  return (
    <div className="post-actions">
      <button
        className="like-button"
        onClick={handleLike}
        style={{ backgroundColor: liked ? '#e3ccf6' : '#ccc' }}
      >
        ❤️ 좋아요 {likeCount}
      </button>
      <button className="alert-button-main" onClick={handleAlert}>
        <img src="public-img/alert-img.png" alt="신고하기" />
      </button>
      <AlertModal
        showModal={showModal}
        closeModal={closeModal}
        handleRadioChange={handleRadioChange}
        handleReport={handleReport}
        selectedReason={selectedReason}
      />
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
const CommentItem = ({ text, time }) => {
  return (
    <div className="comments">
      <div className="comment-section">
        <CommentUserInfoContainer />
      </div>
      <div className="comment-content">
        <div className="comment-text">{text}</div>
        <div className="comment-time">{time}</div>
      </div>
      {/* <div className="comment-subcontent ">
        <div>❤️ {likes.toLocaleString()}</div>
      </div> */}
    </div>
  );
};

// 댓글 섹션 컴포넌트
const CommentSection = ({ comments }) => {
  /* const comments = [
    { id: 1, username: '김러키', text: '우린 다르지', time: '2024.08.12. 22:25', likes: 22 },
    { id: 2, username: 'lovelyJ', text: 'P들이나 그렇게 살지', time: '2024.08.12. 22:25', likes: 27 },
    { id: 3, username: '리사수', text: '야 이재용은 열심히 살아야지', time: '2024.08.12. 22:25', likes: 171 },
    { id: 4, username: '젠손황', text: '삼성오너면 나도 열심히 산다. 나한테 500억만 줘봐라. 누구보다 열심히 살지.', time: '2024.08.12. 22:25', likes: 53 },
  ]; */

  return (
    <div className="comment-section">
      {comments.map(comment => (
        <CommentItem 
          key={comment.id} 
          username={comment.username} 
          text={comment.text} 
          time={comment.time} 
          // likes={comment.likes} 
        />
      ))}
    </div>
  );
};

// 댓글 입력 컴포넌트
const CommentInput = ({ state, postId }) => {
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
    sendPostCommentRequest(state, postId, inputValue);
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
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    sendGetSinglePostsRequest(state, params.get('postId'), setLoading, setPostData);
  }, [state]);

  return (
    <div className="app">
      <AppContainer />
      <Header />
      {!loading && <UserInfoContainer author = {postData.data.nickName} mbti = {postData.data.mbti}/>}
      {!loading && <PostPageContent post={postData.data} />}
      {!loading && <PostActions likes={postData.data.heartCount} />}
      {!loading && <CommentCount comments={postData.data.comments.length} />}
      {!loading && <CommentSection comments={postData.data.comments}/>}
      {!loading && <CommentInput state = {state} postId = {postData.data.postId}/>}
    </div>
  );
};

export default PostPage;