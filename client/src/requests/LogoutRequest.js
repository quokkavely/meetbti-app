const sendLogoutRequest = async(state, logout) => {
    try{
        console.log('로그아웃 POST요청 전송');

        const response = await fetch(`http://localhost:8080/auth/logout`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
            }        
        );
        if(response.ok){
            console.log('로그아웃 요청 성공');
            logout();
        }else{
            console.log('로그아웃 요청 실패: ', response.status);
        }
    } catch (error){
        console.error('로그아웃 요청 실패', error);
    }
}
export default sendLogoutRequest;