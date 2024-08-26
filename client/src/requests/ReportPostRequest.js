const sendReportPostRequest = async(state, postId, reason) => {
    try{
        console.log('state: ', state);
        console.log('postId: ', postId);
        console.log('reason: ', reason);
        const response = await fetch(`http://localhost:8080/posts/${postId}/reports?postId=${postId}`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify({
                    reason: reason,
                }),
            }
        );
        if(response.ok){
            console.log('신고 요청 성공');
        }else{
            console.log('신고 요청 실패: ', response.status);
        }
    } catch (error){
        console.error('신고 요청 실패', error);
    }
}
export default sendReportPostRequest;