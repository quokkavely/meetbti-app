const sendPostBalancegameResultRequest = async(state, gameId, selectedOption, setSelectedOption, resetGameData) => {
    /* console.log('token: ', state.token);
    console.log('content: ', contentObject); */

    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/balancegames/${gameId}/balancegame-results`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify({
                    selectedOption: selectedOption
                }),
            }
            
        );
        if(response.ok){
            console.log('투표 등록 성공');
            setSelectedOption(selectedOption);
            resetGameData();
        }else{
            console.log('투표 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('투표 등록 실패', error);
    }
}
export default sendPostBalancegameResultRequest;