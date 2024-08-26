const sendGetReportsRequest = async (state, page, size, status, setReports, setLoading) => {
    try{
        const response = await fetch(`http://localhost:8080/reports?page=${page}&size=${size}&status=${status}`,
            {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
            }        
        );
        if(response.ok){
            const data = await response.json();
            console.log('data: ', data);
            setReports(data);

            console.log('신고 목록 로딩 완료')
            if(setLoading !==undefined){
                setLoading(false);
            }
            return data;
        }else{
            console.log('신고 목록 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('신고 목록 GET요청 실패', error);
    }
}
export default sendGetReportsRequest;