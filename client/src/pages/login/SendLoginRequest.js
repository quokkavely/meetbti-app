const sendLoginRequest = async(email, password, login, navigate) => {

    try{
        const response = await fetch('http://localhost:8080/login',
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                }),
            }
            
        );
        if(response.ok){
            const token = response.headers.get('Authorization');
            const memberId = response.headers.get('MemberId');
            console.log('로그인 성공');
            console.log('token: ' + token);
            console.log('memberId: ' + memberId);

            login(token, {email}, memberId);
            navigate('/');
        }else{
            console.log('로그인 실패: ', response.status);
        }
    } catch (error){
        console.error('로그인 실패', error);
    }
}
export default sendLoginRequest;