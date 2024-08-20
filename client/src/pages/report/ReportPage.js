import Header from "../../components/Header";
import './ReportPage.css';
import PageContainer from '../../components/page_container/PageContainer.js';

function ReportItem(props){
    return (
        <div className="report-item">
            <div className="report-info">
                <div className="report-title">{props.type}</div>
                <div className="report-time">{props.time.toLocaleString()}</div>
            </div>
            <input type="checkbox" className="report-checkbox"></input>
        </div>
    );
}

const ReportPage = ()=> {
    const currntTime = new Date();
    const reports = [
        {type:'게시글 신고', time:currntTime},
        {type:'게시글 신고', time:currntTime},
        {type:'댓글 신고', time:currntTime},
        {type:'댓글 신고', time:currntTime},
        {type:'게시글 신고', time:currntTime},
        {type:'댓글 신고', time:currntTime},
    ]
    return (
        <div className="app">
            <Header></Header>
            <div className="report-header">
                신고 내역
                <button className='report-handling-button'>신고 처리</button>
            </div>
            <div>
                {reports.map((value) => <ReportItem type={value.type} time={value.time}></ReportItem>)}
            </div>
            <PageContainer pages={[1,2,3,4,5]}></PageContainer>
        </div>
    );
}
export default ReportPage;