const sendGetSinglePostsRequest = async(state, postId, setLoading, setPost) => {
    try{
        console.log('단일 게시글 정보 GET요청 전송');
        /* console.log('postId: ', postId); */
        const response = await fetch(`http://localhost:8080/posts/${postId}`,
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

            console.log('단일 게시글 정보 로딩 완료')
            setLoading(false);
            return data;
        }else{
            console.log('단일 게시글 정보 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('단일 게시글 정보 GET요청 실패', error);
    }
}
export default sendGetSinglePostsRequest;