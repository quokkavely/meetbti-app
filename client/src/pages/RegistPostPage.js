import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistPostPage.css';


// 헤더(로고, 뒤로가기) 컴포넌트
const Header = () => {
    const navigate = useNavigate();
    return (
      <header className="header">
        <div className="logo-box">
          <div className='logo-img' onClick={() => navigate('/')}>
            <img src="/Main-logo.png" alt='메인로고'/>
          </div>
          <div className="back-icon" onClick={() => navigate(-1)}>
            <img src="back(grey).png" alt='뒤로 가기' />
          </div>
        </div>
        <div className="logo-text">
          <h1>본격 MBTI 커뮤니티!</h1>
        </div>
      </header>
    );
  };

// document.execCommand 사용하면 안됨. 리액트 문법 사용해야 함.
const PostTitle = ({setTitle}) => {
    return (
    <div className='input-post-title'>
        <input type="text" placeholder='제목을 입력하세요' className='title-input' 
        onChange={(e) => setTitle(e.target.value)}/>
    </div>
    );
  };

const PostContent = ({ setContent }) => {
    const editorRef = useRef(null);
  
    const handleContentChange = (e) => {
        setContent(e.target.innerHTML);
    };
    
    return (
        <div className='post-content'>
            <div className="toolbar">
                <button className="text-bold" onClick={() => document.execCommand('bold', false, '')}>𝐁</button>
                <button className="text-italic" onClick={() => document.execCommand('italic', false, '')}>𝐼</button>
                <button className="text-underline" onClick={() => document.execCommand('underline', false, '')}>𝖴</button>
                <button onClick={() => document.execCommand('justifyLeft', false, '')}>
                    <img src="align-left.png" alt="좌측 정렬" className='align-left'/>
                </button>
                <button onClick={() => document.execCommand('justifyCenter', false, '')}>
                    <img src="align-center.png" alt="가운데 정렬" className='align-center'/>
                </button>
                <button onClick={() => document.execCommand('justifyRight', false, '')}>
                    <img src="align-right.png" alt="우측 정렬" className='align-right'/>
                </button>
                <input type="color" className='text-color' onChange={(e) => document.execCommand('foreColor', false, e.target.value)} />
                <button className="text-link" onClick={() => {
                    const url = prompt('링크를 입력하세요:');
                    if (url) {
                        document.execCommand('createLink', false, url);
                    }
                }}>🔗</button>
            </div>
            <div 
                className="editor"
                ref={editorRef}
                contentEditable={true}
                onInput={handleContentChange}
                placeholder={`# 사진은 1장까지 첨부가 가능합니다.
# 남을 비방하거나 욕설이 섞인 게시물은 삭제될 수 있습니다.`}
                style={{width: '100%', maxWidth: '480px'}}
            ></div>
        </div>
    );
};

const AttachImage = ({ setFileName }) => {
    const [fileName, setLocalFileName] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const name = e.target.files[0].name;
            setLocalFileName(name);
            setFileName(name);
        }
    };

    return (
        <div className='attach-image'>
            <label htmlFor="file-upload" className="attach-image-button">
                사진 첨부
            </label>
            <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
            />
            <span className="image-info">
                {fileName ? `첨부된 파일: ${fileName}` : '사진은 5MB 이하까지 가능합니다.'}
            </span>
        </div>
    );
};

const RegistButton = ({ onSubmit }) => {
    return (
        <div className='regist-button'>
            <button onClick={onSubmit}>등록</button>
        </div>
    );
};


  // 게시판 페이지 컴포넌트
const RegistPostPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('');

    const handleSubmit = () => {
        // 게시글 등록 로직 추가
        const postData = {
            title,
            content,
            fileName,
        };
        console.log('게시글 등록:', postData);
        // 등록 후 페이지 이동
        navigate('/MBTIBoard');
    };
    
    return (
      <div className="app">
        <Header />
        <PostTitle setTitle={setTitle} />
        <PostContent setContent={setContent} />
        <AttachImage setFileName={setFileName} />
        <RegistButton onSubmit={handleSubmit} />
      </div>
    );
  };
  
  export default RegistPostPage;