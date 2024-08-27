const sendGetSingleReportRequest = async (state, reportId, setReport, setLoading) => {
    try{
        console.log('state: ', state);
        console.log('reportId: ', reportId);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/reports/${reportId}?reportId=${reportId}`,
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
            setReport(data);

            console.log('신고 정보 로딩 완료')
            if(setLoading !==undefined){
                setLoading(false);
            }
            return data;
        }else{
            console.log('신고 정보 GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('신고 정보 GET요청 실패', error);
    }
}
export default sendGetSingleReportRequest;