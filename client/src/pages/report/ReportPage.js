import Header from "../../components/basic_css/Header.js";
import './ReportPage.css';
import PageContainer from '../../components/page_container/PageContainer.js';
import ReportItem from "../../components/report_item/ReportItem.js";
import ReportHeader from "../../components/report_header/ReportHeader.js";
import { useEffect, useState } from "react";
import sendGetReportsRequest from "../../requests/GetReportsRequest.js";
import { useAuth } from "../../auth/AuthContext.js";
import { useLocation, useNavigate } from "react-router-dom";

const ReportPage = ()=> {
    const currntTime = new Date().toLocaleString();
    const [reports, setReports] = useState({data:[]});
    const { state } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();


    useEffect(() => {
        sendGetReportsRequest(state, page, 5, 'PENDING', setReports, setIsLoading);
    }, []);
    return (
        <div className="app">
            <Header></Header>
            {/* <ReportHeader button='신고 처리'></ReportHeader> */}
            {reports.data.length === 0 ? <div>신고된 컨텐츠가 없어요</div> : 
            reports.data.map((value) => 
            <ReportItem type={value.post.title} time={value.post.createdAt} checkbox={value.checkbox}
            onClick = {() => navigate(`/report-detail?reportId=${value.reportId}`)}
            ></ReportItem>)}
            <PageContainer pages={[1,2,3,4,5]}></PageContainer>
        </div>
    );
}
export default ReportPage;