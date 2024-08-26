import ReportItem from "../../components/report_item/ReportItem";
import Header from "../../components/basic_css/Header";
import './ReportDetail.css';
import Dropdown from "../../components/dropdown/Dropdown";
import { useEffect, useState } from "react";
import sendGetSingleReportRequest from "../../requests/GetSingleReportRequest";
import { useAuth } from '../../auth/AuthContext';
import { useLocation, useNavigate } from "react-router-dom";
import sendPatchReportRequest from "../../requests/PatchReportRequest";

function ReportButtonContainer({ state, navigate, reportId, nickname, banDay, setBanDay }){
    return (
        <div className="ban-button-container">
            <Dropdown 
            description='정지 기간' 
            option={['3일', '7일', '30일']}
            setBanDay = {setBanDay}
            ></Dropdown>
            <button className="ban-button" onClick={() => {
                if(window.confirm(`${nickname} 회원을 ${banDay}일간 제재하시겠어요?`)){
                    sendPatchReportRequest(state, reportId, 'accepted', banDay, navigate);
                }
            }}>제재 승인</button>
            <button className="ban-button" onClick={() => {
                if(window.confirm(`별도의 제재 없이 신고를 삭제하시겠어요?`)){
                    sendPatchReportRequest(state, reportId, 'rejected', '0', navigate);
                }
            }}>기각</button>
        </div>
    );
}

const ReportDetail = () => {
    const currentTime = new Date().toLocaleString();
    const { state } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [reportData, setReportData] = useState({data:{}});
    const [isLoading, setLoading] = useState(true);
    const [banDay, setBanDay] = useState(3);

    useEffect(() => {
        sendGetSingleReportRequest(state, params.get('reportId'), setReportData, setLoading);
    }, []);
    return (
        <div className="app">
            <Header></Header>
            {isLoading ? <div></div> : <div className="report">
                <ReportItem type={reportData.post.title} time={currentTime} checkbox={false}></ReportItem>
                {/* <ReporterAndTarget reporter='옥결' target='치와와'></ReporterAndTarget> */}
                <div>{reportData.post.content}</div>
                <div className="report-content">{'신고 사유: ' + reportData.reason}</div>
            </div>}
            <ReportButtonContainer state = {state} navigate = {navigate} nickname = {reportData.nickname} reportId = {reportData.reportId} 
            banDay = {banDay} setBanDay = {setBanDay}></ReportButtonContainer>
        </div>
    );
}
export default ReportDetail;