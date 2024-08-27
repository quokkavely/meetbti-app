const sendMbtiTestResultsRequest = async(state, page, size, setLoading, setHistoryData) => {
    try{
        console.log('MBTI 테스트 이력 GET요청 전송');
        /* console.log('page: ', page);
        console.log('size: ', size); */
        const response = await fetch(`${process.env.REACT_APP_API_URL}/mbti-test?page=${page}&size=${size}`,
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
            setLoading(false);
            setHistoryData(data);
        }else{
            console.log('MBTI 테스트 이력 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('MBTI 테스트 이력 GET요청 실패', error);
    }
}
export default sendMbtiTestResultsRequest;