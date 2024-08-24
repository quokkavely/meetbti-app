import sendAuthcodeRequest from "./SendAuthcodeRequest";

const sendRegistrationRequest = async(emailInput, nicknameInput, passwordInput) => {
    try{
        const response = await fetch('http://localhost:8080/members',
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput,
                    nickname: nicknameInput,
                    password: passwordInput
                }),
            }
            
        );
        if(response.ok){
            console.log('Member POST요청 성공');
            // 이메일 인증 코드 전송 요청 보내기
            sendAuthcodeRequest(emailInput);
        }else{
            console.log('Member POST요청 실패: ', response.status);
        }
    } catch (error){
        console.error('Member POST요청 실패', error);
    }
}
export default sendRegistrationRequest;