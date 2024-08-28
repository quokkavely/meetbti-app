const sendPatchPostRequest = async (state, postId, memberId, title, content, navigate, data) => {
    try{
        console.log('postId: ', postId);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`,
            {
                method: 'PATCH',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify({
                    /* postId: postId,
                    memberId: memberId, */
                    title: title,
                    content: content,
                    image: data,
                })
            }        
        );
        if(response.ok){
            console.log('게시글 수정 완료');
            navigate(`/postpage?postId=${postId}`);
        }else{
            console.log('게시글 수정 실패: ', response.status);
        }
    } catch (error){
        console.error('게시글 수정 실패', error);
    }
}
export default sendPatchPostRequest;