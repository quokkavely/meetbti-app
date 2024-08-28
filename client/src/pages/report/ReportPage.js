import Header from "../../components/basic_css/Header.js";
import './ReportPage.css';
import PageContainer from '../../components/page_container/PageContainer.js';
import ReportItem from "../../components/report_item/ReportItem.js";
import ReportHeader from "../../components/report_header/ReportHeader.js";
import { useEffect, useState } from "react";
import sendGetReportsRequest from "../../requests/GetReportsRequest.js";
import sendGetBalanceGamesRequest from '../../requests/GetBalancegamesRequest.js';
import { useAuth } from "../../auth/AuthContext.js";
import { useLocation, useNavigate } from "react-router-dom";
import sendGetImageGamesRequest from "../../requests/GetImageGamesRequest.js";
import ReportPageContent from "./ReportPageContent.js";

const ReportPage = ()=> {
    const currntTime = new Date().toLocaleString();
    const [reports, setReports] = useState({data:[]});
    const { state } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState('신고');
    const [noContentMessage, setNoCententMessage] = useState('신고가');


    useEffect(() => {
        switch(selectedButton){
            case '신고':
                sendGetReportsRequest(state, page, 5, 'PENDING', setReports, setIsLoading);
                setNoCententMessage('신고가');
                break;
            case '이미지':
                sendGetImageGamesRequest(state, 1, 6, setIsLoading, setReports);
                setNoCententMessage('이미지게임이');
                break;
            case '밸런스':
                sendGetBalanceGamesRequest(state, 1, 6, setReports, setIsLoading);
                setNoCententMessage('밸런스게임이');
                break;
        }
    }, [selectedButton]);
    return (
        <div className="app">
            <Header></Header>
            <div className="backoffice-radio">
                <button className={'backoffice-radio-button' + (selectedButton === '신고' ? '-selected' : '')}
                onClick={() => {setSelectedButton('신고'); setIsLoading(true); setPage(1)}}>신고 목록</button>
                <button className={'backoffice-radio-button' + (selectedButton === '이미지' ? '-selected' : '')}
                onClick={() => {setSelectedButton('이미지'); setIsLoading(true); setPage(1)}}>이미지게임</button>
                <button className={'backoffice-radio-button' + (selectedButton === '밸런스' ? '-selected' : '')}
                onClick={() => {setSelectedButton('밸런스'); setIsLoading(true); setPage(1)}}>밸런스게임</button>
            </div>
            {/* <ReportHeader button='신고 처리'></ReportHeader> */}
            {
            reports.data.length === 0 ? <div>{`요청된 ${noContentMessage} 없어요`}</div> : 
            isLoading ? <div></div> : 
            <ReportPageContent 
            reports={reports} selectedButton={selectedButton}
            resetImageGames={() => sendGetImageGamesRequest(state, page, 6, setIsLoading, setReports)}
            resetBalanceGames={() => sendGetBalanceGamesRequest(state, page, 6, setReports, setIsLoading)}
            >
            </ReportPageContent>
            }
            {reports.data.length === 0 ? <div></div> : 
            <PageContainer 
                currentPage={page}
                pageInfo={reports.pageInfo}
                getPage={(page) => {
                    switch(selectedButton){
                        case '신고':
                            sendGetReportsRequest(state, page, 5, 'PENDING', setReports, setIsLoading);
                        case '이미지':
                            sendGetImageGamesRequest(state, page, 5, setIsLoading, setReports);
                        case '밸런스' :
                            sendGetBalanceGamesRequest(state, page, 5, setReports, setIsLoading);
                    }
                    
                }}
                setPageOriginal={setPage}
            ></PageContainer>}
        </div>
    );
}
export default ReportPage;