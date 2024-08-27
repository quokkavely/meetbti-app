const sendPostImageGameRequest = async(state, topic, navigate) => {
    console.log('sendPostImageGameRequest 호출됨'); // 디버깅용 로그
    console.log('token: ', state.token);
    console.log('title: ', topic);

    const postData = {
        topic: topic,
        nickName: state.nickName // 필요한 경우 닉네임도 추가
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/imagegames`, {
            method: 'POST',
            headers: {
                'Authorization': `${state.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData) // JSON 문자열로 변환
        });

        if (response.ok) {
            console.log('이미지 게임 등록 성공');
            navigate(`/imagegame`);
        } else {
            console.log('이미지 게임 등록 실패: ', response.status);
        }
    } catch (error) {
        console.error('이미지 게임 등록 실패', error);
    }
}
export default sendPostImageGameRequest;