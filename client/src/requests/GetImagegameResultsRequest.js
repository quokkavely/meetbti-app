const sendGetImagegameResultsRequest = async(state, page, size, memberId, setResults, setLoading) => {
    try {
        setLoading(true); // 로딩 상태를 true로 설정
        console.log('이미지 게임 페이지 GET요청 전송');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/imagegame-results?page=${page}&size=${size}&member-id=${memberId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${state.token}`,
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('data: ', data);
            setResults(data);

            console.log('이미지 게임 참여 목록 로딩 완료');
            setLoading(false);
            return data;
        } else {
            console.log('이미지 게임 참여 목록 GET요청 실패: ', response.status);
        }
    } catch (error) {
        console.error('이미지 게임 참여 목 GET요청 실패', error);
    }
};

export default sendGetImagegameResultsRequest;