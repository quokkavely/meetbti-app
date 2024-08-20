import ReportItem from "../../components/report_item/ReportItem";
import Header from "../../components/Header";
import './ReportDetail.css';
import Dropdown from "../../components/dropdown/Dropdown";

function ReporterAndTarget(props){
    return (
        <div className="reporter-target">
            <div className="reporter-item">
                <span className="type">신고자</span>
                <span className="name">{props.reporter}</span>
            </div>
            <div className="report-arrow">{'>'}</div>
            <div className="target-item">
                <span className="type">대상</span>
                <span className="name">{props.target}</span>
            </div>
        </div>
    );
}

function ReportButtonContainer(){
    return (
        <div className="ban-button-container">
            <Dropdown description='정지 기간 선택' option={['3일 정지', '7일 정지', '30일 정지']}></Dropdown>
            <button className="ban-button">제재 승인</button>
        </div>
    );
}

const ReportDetail = () => {
const currentTime = new Date().toLocaleString();
    return (
        <div className="app">
            <Header></Header>
            <div className="report">
                <ReportItem type='치와와 신고' time={currentTime} checkbox={false}></ReportItem>
                {/* <ReporterAndTarget reporter='옥결' target='치와와'></ReporterAndTarget> */}
                <div className="report-content">그냥 신고하고 싶어요. 제재시켜 주세요.</div>
            </div>
            <ReportButtonContainer></ReportButtonContainer>
        </div>
    );
}
export default ReportDetail;