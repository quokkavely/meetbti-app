const sendGetSingleBalanceGameRequest = async(state, gameId, setBalanceGameData, setLoading) => { 
    try {
        console.log('단일 게시글 정보 GET요청 전송');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/balancegames/${gameId}`, 
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
            setBalanceGameData(data);
            setLoading(false);

            console.log('단일 밸런스 게임 정보 로딩 완료');
            if(state.setLoading !== undefined){
                state.setLoading(false);
            }        
            return data;
        } else {
            console.log('단일 밸런스 게임 정보 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('단일 밸런스 게임 정보 GET요청 실패', error);
    }
}
export default sendGetSingleBalanceGameRequest;