const sendAcceptBalancegame = async (state, gameId) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/balancegames/${gameId}`,
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
        }else{
            console.log('게임 등록 승인 실패', response.status);
        }
    }catch(error){
        console.error('게임 등록 승인 실패', error);
    }
}
export default sendAcceptBalancegame;