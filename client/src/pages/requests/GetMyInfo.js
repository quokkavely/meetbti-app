const getMyInfo = async (state, setMyData, setLoading) => {
    try{
        const response = await fetch('http://localhost:8080/members/me',
            {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
            }        
        );
        if(response.ok){
            console.log('getMyInfo() 실행');
            const data = await response.json();
            console.log('data: ', data);
            setMyData(data);

            console.log('내 정보 로딩 완료')
            setLoading(false);
            return data;
        }else{
            console.log('GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('GET요청 실패', error);
    }
}
export default getMyInfo;