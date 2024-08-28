import { useNavigate } from "react-router-dom";

const sendPostBalancegameResultRequest = async(state, gameId, selectedOption, navigate) => {
    /* console.log('token: ', state.token);
    console.log('content: ', contentObject); */

    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/imagegames/${gameId}/imagegame-results`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify({
                    selectedMbti: selectedOption
                }),
            }
            
        );
        if(response.ok){
            console.log('투표 등록 성공');
            /* setSelectedOption(selectedOption); */
            navigate(`/imagegame-result?gameId=${gameId}`);
        }else{
            console.log('투표 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('투표 등록 실패', error);
    }
}
export default sendPostBalancegameResultRequest;