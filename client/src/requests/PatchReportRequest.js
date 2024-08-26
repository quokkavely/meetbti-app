const sendPatchReportRequest = async(state, reportId, status, day, navigate) => {
    try{
        console.log('status: ', status);
        console.log('day: ', day);

        /* const url = status === 'ACCEPTED' ? `http://localhost:8080/reports/${reportId}?status=ACCEPTED&day=${day}` :
            `http://localhost:8080/reports/${reportId}?status=REJECTED&day=${day}` */
        const response = await fetch(`http://localhost:8080/reports/${reportId}?status=${status}&day=${day}`,
            {
                method: 'PATCH',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
            }
            
        );
        if(response.ok){
            console.log('신고 처리 완료');
            alert('제재가 완료되었어요');
            navigate('/report');
        }else{
            console.log('신고 처리 실패: ', response.status);
        }
    } catch (error){
        console.error('신고 처리 실패', error);
    }
}
export default sendPatchReportRequest;