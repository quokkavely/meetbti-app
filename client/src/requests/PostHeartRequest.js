const sendPostHeartRequest = async(state, contentId, location, resetData) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${location}/${contentId}/hearts`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
            }    
        );
        if(response.ok){
            console.log('좋아요 등록 성공');
            if(resetData !== undefined){
                resetData();
            }
        }else{
            console.log('좋아요 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('좋아요 등록 실패', error);
    }
}
export default sendPostHeartRequest;