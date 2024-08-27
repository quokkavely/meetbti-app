const sendGetBalanceGamesRequest = async(state, page, size, setGames, setIsLoading) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/balancegames?page=${page}&size=${size}`,
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
            setGames(data);

            console.log('밸런스게임 목록 로딩 완료')
            if(setIsLoading !==undefined){
                setIsLoading(false);
            }
            return data;
        }else{
            console.log('밸런스게임 목록 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('밸런스게임 목록 GET요청 실패', error);
    }
}
export default sendGetBalanceGamesRequest;