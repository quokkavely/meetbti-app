const sendChangePasswordRequest = async(state, passwordInput) => {
    try{
        const response = await fetch('http://localhost:8080/members/me/change-password',
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify(
                    {
                        password: passwordInput
                    }
                ),
            }
        );
        if(response.ok){
            console.log(`비밀번호 변경 요청 성공`);
            alert('비밀번호가 성공적으로 변경되었어요');
        }else{
            console.log('비밀번호 변경 요청 실패', response.status);
        }
    }catch(error){
        console.error('비밀번호 변경 요청 실패', error);
    }
}
export default sendChangePasswordRequest;