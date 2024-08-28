const sendAcceptImagegame = async (state, gameId, resetGames) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/imagegames/${gameId}`,
            {
                method: 'PATCH',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`
                },
            }
        );
        if(response.ok){
            console.log(`게임 등록 승인됨`);
            resetGames();
        }else{
            console.log('게임 등록 승인 실패', response.status);
        }
    }catch(error){
        console.error('게임 등록 승인 실패', error);
    }
}
export default sendAcceptImagegame;