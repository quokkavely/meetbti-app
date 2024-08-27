const sendGetPostsRequest = async(state, page, size, category, sortBy, setLoading, setPosts) => {
    try{
        /* console.log(`category: ${category}, sortBy: ${sortBy}`);
        console.log('state: ', state); */
        const url = category === 'MY' ? `${process.env.REACT_APP_API_URL}/posts?page=${page}&size=${size}&category=${category}&standard=${sortBy}&member-id=${state.memberId}` :
            `${process.env.REACT_APP_API_URL}/posts?page=${page}&size=${size}&category=${category}&standard=${sortBy}`;
        const response = await fetch(url,
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

            console.log('게시글 페이지 로딩 완료')
            setLoading(false);
            return data;
        }else{
            console.log('게시글 페이지 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('게시글 페이지 GET요청 실패', error);
    }
}
export default sendGetPostsRequest;