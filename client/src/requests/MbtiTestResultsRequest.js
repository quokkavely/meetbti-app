const sendMbtiTestResultsRequest = async(state, page, size, setLoading, setHistoryData) => {
    try{
        console.log('MBTI 테스트 이력 GET요청 전송');
        console.log('page: ', page);
        console.log('size: ', size);
        const response = await fetch(`http://localhost:8080/mbti-test?page=${page}&size=${size}&member-id=1`,
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