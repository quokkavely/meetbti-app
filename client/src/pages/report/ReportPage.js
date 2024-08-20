import Header from "../../components/Header";
import './ReportPage.css';
import PageContainer from '../../components/page_container/PageContainer.js';
import ReportItem from "../../components/report_item/ReportItem.js";
import ReportHeader from "../../components/report_header/ReportHeader.js";

const ReportPage = ()=> {
    const currntTime = new Date().toLocaleString();
    const reports = [
        {type:'게시글 신고', time:currntTime, checkbox:true},
        {type:'게시글 신고', time:currntTime, checkbox:true},
        {type:'댓글 신고', time:currntTime, checkbox:true},
        {type:'댓글 신고', time:currntTime, checkbox:true},
        {type:'게시글 신고', time:currntTime, checkbox:true},
        {type:'댓글 신고', time:currntTime, checkbox:true},
    ]
    return (
        <div className="app">
            <Header></Header>
            <ReportHeader button='신고 처리'></ReportHeader>
            <div>
                {reports.map((value) => <ReportItem type={value.type} time={value.time} checkbox={value.checkbox}></ReportItem>)}
            </div>
            <PageContainer pages={[1,2,3,4,5]}></PageContainer>
        </div>
    );
}
export default ReportPage;