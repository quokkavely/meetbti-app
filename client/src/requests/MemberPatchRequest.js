const sendMemberPatchRequest = async(state, patchBody) => {
    try{
        const response = await fetch('http://localhost:8080/members/me',
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
        }else{
            console.log('멤버 PATCH 요청 실패', response.status);
        }
    }catch(error){
        console.error('멤버 PATCH 요청 실패', error);
    }
}
export default sendMemberPatchRequest;