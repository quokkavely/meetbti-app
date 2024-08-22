import { useEffect, useState } from "react";
import Header from "../../components/Header";
import './MbtiTestPage.css';
import { useAuth } from "../../auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

function ProgressionBar(props){
    const progressPercentage = ((props.stage/*  - 1 */) / 16) * 100;
    /* console.log(props.stage);
    console.log(progressPercentage); */
    return (
        <div className="progression-bar">
            <div className="current-progress" style={{ '--progress-width': `${progressPercentage}%` }}></div>
            <div className="goal-progress" style={{ '--goal-width': `${100 - progressPercentage}%`, '--left': `${-1 * progressPercentage}%` }}></div>
        </div>
    );
}

function TestBox(props){
    return (
        <div className="test-box">
            <div className="test-number">{props.number}/16</div>
            <ProgressionBar stage={props.stage}></ProgressionBar>
            <div className="test-content-box">
                <div className="test-content">{props.testContent}</div>
            </div> 
        </div>
    );
}

const getQuestions = async(setLoading, setQuestion) => {
    console.log('질문 가져오는 중...')
    let data = [];
    try{
        const response = await fetch('http://localhost:8080/questions',
            {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            }        
        );
        if(response.ok){
            data = await response.json();
            console.log(data);
            setQuestion(data);
            setLoading(false);
            console.log('질문 로딩 완료')
        }else{
            console.log('GET요청 실패: ', response.status);
        }
    } catch (error){
        console.error('GET요청 실패', error);
    }
}
const Question = (props) => {
    return (
        <div>
            <div className="testbox-container">
                <TestBox number={props.number} testContent={props.title}
                stage = {props.stage}></TestBox>
            </div>
            <div className="test-response-container">
                <button className="test-response" onClick = {() => {props.respond(0)}}>{props.answer[0].content}</button>
                <button className="test-response" onClick = {() => {props.respond(1)}}>{props.answer[1].content}</button>
                <button className="test-response" onClick = {() => {props.respond(2)}}>{props.answer[2].content}</button>
                <button className="test-response" onClick = {() => {props.respond(3)}}>{props.answer[3].content}</button>
            </div>
        </div>
    );
}
const sendResponses = async(responses, state, navigate) =>{
    console.log(state);
    console.log(state.token);
    try{
        const response = await fetch('http://localhost:8080/mbti-test',
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}}`
                },
                body: JSON.stringify({
                    answerIds : responses,
                }),
            }        
        );
        if(response.ok){            
            console.log('MBTI 테스트 완료');
            navigate('/testresult');
        }else{
            console.log(responses);
            console.log('MBTI 테스트 실패: ', response.status);
        }
    } catch (error){
        console.error('MBTI 테스트 실패', error);
    }
}
const respond = (buttonIndex, stage, setStage, questions, responses, setResponses, state, navigate)=> {
    /* console.log(questions); */
    const responseId = questions[stage-1].answers[buttonIndex].answerId;

    const copy = [...responses, responseId];
    setResponses(copy);
    /* console.log(responses); */
    if(stage === 16){
        // 결과 전송
        sendResponses(responses, state, navigate);
    }else{
        setStage(stage + 1);
    }
}

const MbtiTestPage = () => {
    const [stage, setStage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestion] = useState([]);
    const [responses, setResponses] = useState([]);
    const { state } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getQuestions(setLoading, setQuestion);
    }, []);

    const questionReady = ()=> {
        return !loading && stage > 0 && stage <= 16;
    }
    
    return (
        <div className="app">
            <Header></Header>
            {questionReady() && <Question number = {stage} title={questions[stage-1].content}
            answer = {questions[stage-1].answers} respond = {(buttonIndex) => respond(buttonIndex, stage, setStage, questions, responses, setResponses, state, navigate)}
            stage = {stage}>
            </Question>}
        </div>
    );
}
export default MbtiTestPage;