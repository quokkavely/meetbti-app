import sendLoginRequest from "./LoginRequest";

const sendVerifyRequest = async(emailInput, authCodeInput, passwordInput, login, navigate) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/members/verify`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput,
                    authCode: authCodeInput
                })
            }
        );
        if(response.ok){
            console.log('인증 코드 확인됨');
            sendLoginRequest(emailInput, passwordInput, login, navigate)
        }else{
            console.log('인증 코드 확인 요청 실패', response.status);
        }
    }catch(error){
        console.log('인증 코드 확인 요청 실패', error);
    }
}
export default sendVerifyRequest;