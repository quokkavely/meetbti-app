const sendNicknameDuplCheckRequest = async(nickName, executeAfter, executeAfterFailed) => {
    try{
        /* console.log(nickName); */
        const response = await fetch(`http://localhost:8080/members/check-nickname?nickName=${nickName}`,
            {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            }
        );
        if(response.ok){
            console.log(`닉네임 중복 확인 통과`);
            executeAfter();
        }else{
            console.log('닉네임 중복 확인 미통과', response.status);
            executeAfterFailed();
        }
    }catch(error){
        console.error('닉네임 중복 확인 실패', error);
    }
}
export default sendNicknameDuplCheckRequest;