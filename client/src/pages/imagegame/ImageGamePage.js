import Header from "../../components/Header";
import './ImageGamePage.css';

const mbtiButtonsA = [{id:'ENFP'}, {id:'ESFJ'}, {id:'ISFP'}, {id:'ESFP'}, {id:'ESTP'}, {id:'ISTJ'}, {id:'INTJ'}, {id:'ENTP'}];
const mbtiButtonsB = [{id:'ENFJ'}, {id:'INFP'}, {id:'INFJ'}, {id:'ISFJ'}, {id:'ESTJ'}, {id:'ENTJ'}, {id:'ISTP'}, {id:'INTP'}];

function MbtiButton(props){
    return (
        <button className="imagegame-vote-button" id={props.name}>{props.name}</button>
    );
}

const ImageGamePage = () => {
    return (
        <div className="app">
            <Header></Header>
            <h2 className="imagegame-title">MBTI를 가장 잘 믿을 것 같은 MBTI는?</h2>
            <div className="imagegame-author">작성자: 치와와</div>
            <div className="imagegame-button-container-container">
                <div className="imagegame-button-container">
                    {mbtiButtonsA.map((value) => <MbtiButton name={value.id}></MbtiButton>)}
                </div>
                <div className="imagegame-button-container">
                    {mbtiButtonsB.map((value) => <MbtiButton name={value.id}></MbtiButton>)}
                </div>
            </div>
        </div>
    );
}
export default ImageGamePage;