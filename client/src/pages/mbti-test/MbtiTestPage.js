import Header from "../../components/Header";
import './MbtiTestPage.css';

function ProgressionBar(){
    return (
        <div className="progression-bar">
            <div className="current-progress"></div>
            <div className="goal-progress"></div>
        </div>
    );
}

function TestBox(props){
    return (
        <div className="test-box">
            <div className="test-number">{props.number}/16</div>
            <ProgressionBar></ProgressionBar>
            <div className="test-content-box">
                <div className="test-content">{props.testContent}</div>
            </div> 
        </div>
    );
}

const MbtiTestPage = () => {
    return (
        <div className="app">
            <Header></Header>
            <div className="testbox-container">
                <TestBox number={1} testContent='시험 결과를 기다리는 중 기분이 어때 라는 질문에 당신의 대답은?'></TestBox>
            </div>
            <div className="test-response-container">
                <button className="test-response">조금 초조해</button>
                <button className="test-response">결과는 결과일 뿐이야</button>
                <button className="test-response">잘 나왔으면 좋겠어</button>
                <button className="test-response">이미 끝난 일이니까 잊고 있어</button>
            </div>
        </div>
    );
}
export default MbtiTestPage;