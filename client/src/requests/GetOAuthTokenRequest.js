const sendGetOAuthTokenRequest = async () => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/oauth2/authorization/google`,
            {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            }        
        );
        if(response.ok){
            const data = await response.json();
            console.log('data: ', data);
            console.log('구글 OAuth2 GET요청 완료')

            return data;
        }else{
            console.log('구글 OAuth2 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('구글 OAuth2 GET요청 실패', error);
    }
}
export default sendGetOAuthTokenRequest;