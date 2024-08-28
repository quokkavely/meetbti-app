const sendChangePasswordRequest = async(state, passwordInput, passwordComfirmInput, setPassword, setConfirmPassword) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/members/mypage/password`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify(
                    {
                        newPassword: passwordInput,
                        confirmPassword: passwordComfirmInput
                    }
                ),
            }
        );
        if(response.ok){
            console.log(`비밀번호 변경 요청 성공`);
            alert('비밀번호가 성공적으로 변경되었어요');
            setPassword('');
            setConfirmPassword('');
        }else{
            console.log('비밀번호 변경 요청 실패', response.status);
        }
    }catch(error){
        console.error('비밀번호 변경 요청 실패', error);
    }
}
export default sendChangePasswordRequest;