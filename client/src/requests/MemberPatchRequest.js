const sendMemberPatchRequest = async(state, patchBody) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/members/mypage`,
            {
                method: 'PATCH',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify(patchBody),
            }
        );
        if(response.ok){
            console.log(`멤버 PATCH 요청 성공`);
            alert('닉네임이 성공적으로 변경되었어요');
        }else{
            console.log('멤버 PATCH 요청 실패', response.status);
        }
    }catch(error){
        console.error('멤버 PATCH 요청 실패', error);
    }
}
export default sendMemberPatchRequest;