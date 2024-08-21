import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostPage.css';

// 컴포넌트 임포트
import UserInfoContainer from '../components/UserInfoContainer';
import AppContainer from '../components/AppContainer';
import Header from '../components/Header';
import CommentUserInfoContainer from '../components/CommentUserInfoContainer';
import AlertModal from '../components/AlertModal';

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

const UserInfoComponent = () => {
    return (
        <UserInfoContainer />
    );
};


// 포스트 컨텐츠 컴포넌트
const PostPageContent = ({ post }) => {
  return (
    <div className="post-page-content">
      <div className="post-title">{post.title}</div>
      <div className="post-meta">
        <span>{post.date}</span>
        <span>조회 {post.views.toLocaleString()}</span>
        <span>❤️ {post.likes.toLocaleString()}</span> 
        <span>💬 {post.comments.toLocaleString()}</span> 
      </div>
      <img src={post.image} alt="post" className="post-image" />
      <div className="post-text">{post.text}</div>
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
        ❤️ 좋아요 {likeCount.toLocaleString()}
      </button>
      <button className="alert-button-main" onClick={handleAlert}>
        <img src="alert-img.png" alt="신고하기" />
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


// 댓글 섹션 컴포넌트
const CommentSection = () => {
  const comments = [
    { id: 1, username: '김러키', text: '우린 다르지', time: '2024.08.12. 22:25', likes: 22 },
    { id: 2, username: 'lovelyJ', text: 'P들이나 그렇게 살지', time: '2024.08.12. 22:25', likes: 27 },
    { id: 3, username: '리사수', text: '야 이재용은 열심히 살아야지', time: '2024.08.12. 22:25', likes: 171 },
    { id: 4, username: '젠손황', text: '삼성오너면 나도 열심히 산다. 나한테 500억만 줘봐라. 누구보다 열심히 살지.', time: '2024.08.12. 22:25', likes: 53 },
  ];

  return (
    <div className="comment-section">
      {comments.map(comment => (
        <CommentItem 
          key={comment.id} 
          username={comment.username} 
          text={comment.text} 
          time={comment.time} 
          likes={comment.likes} 
        />
      ))}
    </div>
  );
};



// 댓글 입력 컴포넌트
const CommentInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    // 댓글 전송 로직 추가
    console.log('댓글 전송:', inputValue);
    setInputValue('');
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
        <img src="send-img.png" alt="댓글 보내기" />
      </div>
    </div>
  );
};



const PostPage = () => {
  const post = {
    title: "이재용도 이렇게 열심히 사는데...",
    date: "2024.08.20. 23:20",
    views: 242,
    likes: 0,
    comments: 5,
    image: "Mrsamsung.jpg",
    text: "너네가 뭐라고 그렇게 대충 사냐? 반성해라"
  };

  return (
    <div className="app">
      <AppContainerComponent />
      <HeaderComponent />
      <UserInfoComponent />
      <PostPageContent post={post} />
      <PostActions likes={post.likes} />
      <CommentCount comments={post.comments} />
      <CommentSection />
      <CommentInput />
    </div>
  );
};

export default PostPage;