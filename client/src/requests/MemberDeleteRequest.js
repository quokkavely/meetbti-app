const sendMemberDeleteRequest = async(state, logout, navigate) => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/members/mypage`,
            {
                method: 'DELETE',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`
                },
            }
            
        );
        if(response.ok){
            console.log('회원 탈퇴 성공');
            logout();
            navigate('/');
        }else{
            console.log('회원 탈퇴 실패: ', response.status);
        }
    } catch (error){
        console.error('회원 탈퇴 실패', error);
    }
}
export default sendMemberDeleteRequest;