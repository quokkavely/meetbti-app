const sendAuthcodeRequest = async (emailInput)=> {
    try{
        const response = await fetch('http://localhost:8080/send-mail/email',
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput
                })
            }
        );
        if(response.ok){
            console.log(`인증 코드가 ${emailInput}으로 전송됨`);
        }else{
            console.log('인증 코드 전송 요청 실패', response.status);
        }
    }catch(error){
        console.error('인증 코드 전송 요청 실패', error);
    }
}
export default sendAuthcodeRequest;