const sendEmailDuplCheckRequest = async(email, executeAfter, executeAfterFailed) => {
    try{
        /* console.log(email); */
        const response = await fetch(`${process.env.REACT_APP_API_URL}/members/check-email?email=${email}`,
            {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            }
        );
        if(response.ok){
            console.log(`이메일 중복 확인 통과`);
            executeAfter();
        }else{
            console.log('이메일 중복 확인 미통과', response.status);
            executeAfterFailed();
        }
    }catch(error){
        console.error('이메일 중복 확인 실패', error);
    }
}
export default sendEmailDuplCheckRequest;