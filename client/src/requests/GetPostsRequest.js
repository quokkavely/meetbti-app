const sendGetPostsRequest = async(state, page, size, category, sortBy, setLoading, setPosts) => {
    try{
        console.log('게시글 페이지 GET요청 전송');
        const response = await fetch(`http://localhost:8080/posts?page=${page}&size=${size}&category=${category}&standard=${sortBy}`,
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
            setPosts(data);

            console.log('게시글 정보 로딩 완료')
            setLoading(false);
            return data;
        }else{
            console.log('게시글 정보 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('게시글 정보 GET요청 실패', error);
    }
}
export default sendGetPostsRequest;