const sendPostCommentRequest = async(state, postId, content, setInputValue, resetPostData) => {
    try{
        console.log('state: ', state);
        console.log('postId: ', postId);
        console.log('content: ', content);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify({
                    content: content
                }),
            }
            
        );
        if(response.ok){
            console.log('댓글 등록 성공');
            setInputValue('');
            resetPostData();
        }else{
            console.log('댓글 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('댓글 등록 실패', error);
    }
}
export default sendPostCommentRequest;