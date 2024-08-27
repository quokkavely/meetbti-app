const sendPostHeartOnPostRequest = async(state, postId) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/hearts`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
            }    
        );
        if(response.ok){
            console.log('게시글 좋아요 등록 성공');
        }else{
            console.log('게시글 좋아요 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('게시글 좋아요 등록 실패', error);
    }
}
export default sendPostHeartOnPostRequest;