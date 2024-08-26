const sendDeletePostRequest = async(state, category, postId, navigate) => {
    try{
        const response = await fetch(`http://localhost:8080/posts/${postId}`,
            {
                method: 'DELETE',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`
                },
            } 
        );
        if(response.ok){
            console.log('게시글 삭제 성공');
            navigate(`/mbtiboard?category=${category}`);
        }else{
            console.log('게시글 삭제 실패: ', response.status);
        }
    } catch (error){
        console.error('게시글 삭제 실패', error);
    }
}
export default sendDeletePostRequest;