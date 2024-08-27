const sendPostBalancegameRequest = async(state, title, leftOption, rightOption, navigate) => {
    try{
        console.log('state: ', state);
        console.log('title: ', title);
        console.log('leftOption: ', leftOption);
        console.log('rightOption: ', rightOption);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/balancegames`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify({
                    title: title,
                    leftOption: leftOption,
                    rightOption: rightOption
                }),
            }
        );
        if(response.ok){
            console.log('밸런스게임 등록 요청 성공');
            alert('등록 요청되었어요');
            navigate('/balancegame');
        }else{
            console.log('밸런스게임 등록 요청 실패: ', response.status);
        }
    } catch (error){
        console.error('밸런스게임 등록 요청 실패', error);
    }
}
export default sendPostBalancegameRequest;