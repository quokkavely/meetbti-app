import sendAuthcodeRequest from "./AuthcodeRequest";

const sendRegistrationRequest = async(emailInput, nicknameInput, passwordInput) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/members`,
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
            /* sendAuthcodeRequest(emailInput); */ // 이제 필요 없음 - 백엔드에서 자동으로 보내줌
        }else{
            console.log('Member POST요청 실패: ', response.status);
        }
    } catch (error){
        console.error('Member POST요청 실패', error);
    }
}
export default sendRegistrationRequest;