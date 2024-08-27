import ReportItem from "../../components/report_item/ReportItem";
import { Navigate, useNavigate } from "react-router-dom";

const ReportPageContent = ({ reports, selectedButton }) => {
    const navigate = useNavigate();
    switch(selectedButton){
        case '신고':
            return (
                reports.data.map((value) => 
                    <ReportItem type={value.post.title} time={value.post.createdAt} 
                    onClick = {() => navigate(`/report-detail?reportId=${value.reportId}`)}
                    ></ReportItem>)
            );
        case '이미지':
            return (
                reports.data.map((value) =>
                    <ReportItem type={value.topic}
                    onClick = {() => navigate(`/`)}></ReportItem>
                )
            )
        case '밸런스':
            return (
                reports.data.map((value) =>
                    <ReportItem type={value.title}
                    onClick = {() => navigate(`/`)}></ReportItem>
                )
            )
    }

}
export default ReportPageContent;