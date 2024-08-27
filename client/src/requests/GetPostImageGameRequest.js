const sendGetPostImageGameRequest = async(state, page, size, setLoading, setPostsImageGame, gameId) => {
    try {
        setLoading(true); // 로딩 상태를 true로 설정
        console.log('이미지 게임 페이지 GET요청 전송');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/imagegames?page=${page}&size=${size}&gameId=${gameId}`, {
            method: 'GET',
            headers: {
                'Authorization': `${state.token}`,
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('data: ', data);
            setPostsImageGame(data);

            console.log('이미지 게임 게시글 페이지 로딩 완료');
            setLoading(false);
            return data;
        } else {
            console.log('이미지 게임 페이지 GET요청 실패: ', response.status);
            setLoading(false); // 실패 시 로딩 상태를 false로 설정
        }
    } catch (error) {
        console.error('이미지 게임 페이지 GET요청 실패', error);
        setLoading(false); // 에러 발생 시 로딩 상태를 false로 설정
    }
};

export default sendGetPostImageGameRequest;