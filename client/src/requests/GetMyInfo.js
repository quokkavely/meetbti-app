const sendGetMyinfoRequest = async (state, setMyData, setLoading) => {
    try{
        console.log('회원 정보 GET요청 전송');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/members/mypage`,
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
            setMyData(data);

            console.log('회원 로딩 완료')
            if(setLoading !==undefined){
                setLoading(false);
            }
            return data;
        }else{
            console.log('회원 정보 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('회원 정보 GET요청 실패', error);
    }
}
export default sendGetMyinfoRequest;