const sendGetMyCommentsRequest = async(state, page, size, setMyComments, setIsLoading) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/comments?page=${page}&size=${size}&member-id=${state.memberId}`,
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
            setMyComments(data);

            console.log('내 댓글 목록 로딩 완료')
            if(setIsLoading !==undefined){
                setIsLoading(false);
            }
            return data;
        }else{
            console.log('내 댓글 목록 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('내 댓글 목록 GET요청 실패', error);
    }
}
export default sendGetMyCommentsRequest;