import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RegistPost.css';
import sendPostPostRequest from '../../requests/PostPostRequest';
import { useAuth } from '../../auth/AuthContext';
import sendGetSinglePostsRequest from '../../requests/GetSinglePostRequest';
import sendPatchPostRequest from '../../requests/PatchPostRequest';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import sendUploadPostImageRequest from '../../requests/UploadPostImageRequest';


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
            <textarea 
                className="editor"
                value = {value}
                ref={editorRef}
                contentEditable={true}
                onChange={handleContentChange}
                placeholder={`# 사진은 1장까지 첨부 가능해요.
# 타인을 비방하거나 욕설이 섞인 게시물은 삭제될 수 있어요.`}
                style={{width: '100%', maxWidth: '480px'}}
            ></textarea>
        // </div>
    );
};

const AttachImage = ({ setFileName, setImageFile }) => {
    const [fileName, setLocalFileName] = useState('');
    

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const name = e.target.files[0].name;
            setLocalFileName(name);
            setFileName(name);
            setImageFile(e.target.files[0]);
            console.log('file: ', e.target.files[0]);
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
                {fileName ? `첨부된 파일: ${fileName}` : '사진은 10MB 이하까지 첨부할 수 있어요.'}
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
            
            const contentObject = {title: title, content: content, category: params.get('category')};
            
            // 이미지 없이 업로드
            if(image === null){
                sendPostPostRequest(state, contentObject, navigate);
                return;
            }
            sendUploadPostImageRequest(state, image, (data) => sendPostPostRequest(state, contentObject, navigate, data));
            return;
        } 
    }
    if(params.get('action') === 'modify'){
        if(window.confirm('게시글을 수정하시겠어요?')){
            const contentObject = {title: title, content: content, category: params.get('category')};

            if(image === null){
                sendPatchPostRequest(state, params.get('postId'), memberId, title, content, navigate);
                return;
            }
            sendUploadPostImageRequest(state, image, (data) => sendPatchPostRequest(state, params.get('postId'), memberId, title, content, navigate, data));
            
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
    const [imageFile, setImageFile] = useState(null);

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
    
    return (
      <div className="app">
        <AppContainerComponent />
        <HeaderComponent />
        <PostTitle setTitle={setTitle} value={title}/>
        <PostContent setContent={setContent} value={content}/>
        <AttachImage setFileName={setFileName} setImageFile={setImageFile} />
        <RegistButton
         state = {state}
         navigate = {navigate} 
         title = {title} 
         content = {content} 
         params = {new URLSearchParams(location.search)}
         image= {imageFile}
         />
      </div>
    );
  };
  
  export default RegistPostPage;