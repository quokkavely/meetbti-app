const sendLoginRequest = async(email, password, login, navigate, whenFailed) => {

    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`,
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
            if(response.status === 401){
                console.log('401번 에러!');
                whenFailed('이메일 또는 비밀번호를 확인해주세요');
            }else if(response.status === 403){
                whenFailed('정지 또는 탈퇴한 회원이세요!');
            }
            
        }
    } catch (error){
        console.error('로그인 실패', error);
        whenFailed();
    }
}
export default sendLoginRequest;