const sendGetSinglePostsRequest = async(state, postId, setLoading, setPost, setLikeCount) => {
    try{
        console.log('단일 게시글 정보 GET요청 전송');
        console.log('postId: ', postId);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`,
            {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
            }        
        );
        if(response.ok){
            const data = await response.json();
            console.log('data: ', data);
            setPost(data);

            console.log('단일 게시글 정보 로딩 완료');
            if(setLoading !== undefined){
                setLoading(false);
            }    
            if(setLikeCount !== undefined){
                setLikeCount();
            }      
            return data;
        }else{
            console.log('단일 게시글 정보 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('단일 게시글 정보 GET요청 실패', error);
    }
}
export default sendGetSinglePostsRequest;