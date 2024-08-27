const sendGetLastTestResultRequest = async(state, setLoading, setResult) => {
    try{
        const url = `${process.env.REACT_APP_API_URL}/mbti-test/mypage`;
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
            setResult(data);

            console.log('마지막 테스트 결과 로딩 완료')
            setLoading(false);
            return data;
        }else{
            console.log('마지막 테스트 결과 로딩 실패: ', response.status);
        }
    } catch (error){
        console.error('마지막 테스트 결과 로딩 실패', error);
    }
}
export default sendGetLastTestResultRequest;