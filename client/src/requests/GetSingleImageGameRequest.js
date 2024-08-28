import { useNavigate } from "react-router-dom";

const sendGetSingleImageGameRequest = async(state, imageGameId, setImageGameData, setLoading, navigate) => { //requestBody를 참고
    try {
        console.log('단일 게시글 정보 GET요청 전송');
        console.log(imageGameId);
        console.log('Authorization Token:', state.token);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/imagegames/${imageGameId}`, // gameId를 state에서 가져옴
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
            setImageGameData(data);
            setLoading(false);

            console.log('단일 게시글 정보 로딩 완료');
            if(state.setLoading !== undefined){ // setLoading을 state에서 가져옴
                state.setLoading(false);
            }    
            // if(state.setLikeCount !== undefined){ // setLikeCount를 state에서 가져옴
            //     state.setLikeCount();
            // }      
            return data;
        } else {
            console.log('단일 이미지 게임 정보 GET요청 실패: ', response.status);
            /* if (response.status === 404)
            alert("야, 꺼져!");
            navigate("/imagegame"); */
        }
    } catch (error){
        console.error('단일 이미지 게임 정보 GET요청 실패', error);
    }
    return { data: {} };
}
export default sendGetSingleImageGameRequest;