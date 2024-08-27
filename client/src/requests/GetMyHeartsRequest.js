const sendGetMyHeartsRequest = async(state, page, size, type, setMyHearts, setIsLoading) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/hearts?page=${page}&size=${size}&type=${type}`,
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
            setMyHearts(data);

            console.log('내 좋아요 목록 로딩 완료')
            if(setIsLoading !==undefined){
                setIsLoading(false);
            }
            return data;
        }else{
            console.log('내 좋아요 목록 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('내 좋아요 목록 GET요청 실패', error);
    }
}
export default sendGetMyHeartsRequest;