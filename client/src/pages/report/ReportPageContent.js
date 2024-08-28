import ReportItem from "../../components/report_item/ReportItem";
import { Navigate, useNavigate } from "react-router-dom";
import sendAcceptBalancegame from "../../requests/AcceptBalancegame";
import { useAuth } from "../../auth/AuthContext";
import sendAcceptImagegame from "../../requests/AcceptImagegame";

const ReportPageContent = ({ reports, selectedButton, resetImageGames, resetBalanceGames }) => {
    const navigate = useNavigate();
    const { state } = useAuth();

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
                    onClick = {() => {
                        if(window.confirm('게임 등록 요청을 승인하시겠어요?')){
                            sendAcceptImagegame(state, value.gameId, () => resetImageGames());
                        }

                    }}></ReportItem>
                )
            )
        case '밸런스':
            return (
                reports.data.map((value) =>
                    <ReportItem type={value.title}
                    onClick = {() => {
                        if(window.confirm('게임 등록 요청을 승인하시겠어요?')){
                            sendAcceptBalancegame(state, value.gameId, () => resetBalanceGames());
                        }
                    }}></ReportItem>
                )
            )
    }

}
export default ReportPageContent;