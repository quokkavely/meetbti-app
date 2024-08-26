import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegistPost.css';
import sendPostPostRequest from '../../requests/PostPostRequest';
import { useAuth } from '../../auth/AuthContext';
import sendGetSinglePostsRequest from '../../requests/GetSinglePostRequest';
import sendPatchPostRequest from '../../requests/PatchPostRequest';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';


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


// document.execCommand 사용하면 안됨. 리액트 문법 사용해야 함.
const PostTitle = ({setTitle, value}) => {
    return (
    <div className='input-post-title'>
        <input type="text" value = {value} placeholder='제목을 입력하세요' className='title-input' 
        onChange={(e) => setTitle(e.target.value)}/>
    </div>
    );
  };

const PostContent = ({ setContent, value }) => {
    const editorRef = useRef(null);
  
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    
    return (
        <div className='post-content'>
            <div className="toolbar">
                <button className="text-bold" onClick={() => document.execCommand('bold', false, '')}>𝐁</button>
                <button className="text-italic" onClick={() => document.execCommand('italic', false, '')}>𝐼</button>
                <button className="text-underline" onClick={() => document.execCommand('underline', false, '')}>𝖴</button>
                <button onClick={() => document.execCommand('justifyLeft', false, '')}>
                    <img src="public-img/align-left.png" alt="좌측 정렬" className='align-left'/>
                </button>
                <button onClick={() => document.execCommand('justifyCenter', false, '')}>
                    <img src="public-img/align-center.png" alt="가운데 정렬" className='align-center'/>
                </button>
                <button onClick={() => document.execCommand('justifyRight', false, '')}>
                    <img src="public-img/align-right.png" alt="우측 정렬" className='align-right'/>
                </button>
                <input type="color" className='text-color' onChange={(e) => document.execCommand('foreColor', false, e.target.value)} />
                <button className="text-link" onClick={() => {
                    const url = prompt('링크를 입력하세요:');
                    if (url) {
                        document.execCommand('createLink', false, url);
                    }
                }}>🔗</button>
            </div>
            <textarea 
                className="editor"
                value = {value}
                ref={editorRef}
                contentEditable={true}
                onChange={handleContentChange}
                placeholder={`# 사진은 1장까지 첨부가 가능합니다.
# 남을 비방하거나 욕설이 섞인 게시물은 삭제될 수 있습니다.`}
                style={{width: '100%', maxWidth: '480px'}}
            ></textarea>
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
const submitPost = (state, navigate, memberId, title, content, params, image) => {
    if(title === ''){
        alert('제목을 입력해주세요');
        return;
    }
    if(content === ''){
        alert('본문을 입력해주세요');
        return;
    }
    if(params.get('action') === 'post'){
        if(window.confirm('게시글을 등록하시겠어요?')){
            const contentObject = {title: title, content: content, category: params.get('category'), image: 'image'};
            sendPostPostRequest(state, contentObject, navigate);
            return;
        } 
    }
    if(params.get('action') === 'modify'){
        if(window.confirm('게시글을 수정하시겠어요?')){
            const contentObject = {title: title, content: content, category: params.get('category'), image: 'image'};
            sendPatchPostRequest(state, params.get('postId'), memberId, title, content, navigate);
            return;
        }
    }
}

const RegistButton = ({ state, navigate, memberId, title, content, params, image }) => {
    return (
        <div className='regist-button'>
            <button onClick={() => submitPost(state, navigate, state.memberId, title, 
            content, params, image           
            )}>등록</button>
        </div>
    );
};


  // 게시판 페이지 컴포넌트
const RegistPostPage = () => {
    const { login } = useAuth();
    const { state } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(params.get('action') === 'modify'){
            sendGetSinglePostsRequest(state, params.get('postId'), setLoading, 
            (data) => {
                console.log('게시글 정보 적용중...');
                setTitle(data.data.title); 
                setContent(data.data.content);
                setFileName(data.data.image);
            }, undefined);
        }
    }, []);

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
        <AppContainerComponent />
        <HeaderComponent />
        <PostTitle setTitle={setTitle} value={title}/>
        <PostContent setContent={setContent} value={content}/>
        <AttachImage setFileName={setFileName} />
        <RegistButton
         state = {state}
         navigate = {navigate} 
         title = {title} 
         content = {content} 
         params = {new URLSearchParams(location.search)}
         image= {fileName}
         />
      </div>
    );
  };
  
  export default RegistPostPage;