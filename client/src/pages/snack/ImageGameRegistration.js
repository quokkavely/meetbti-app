import Header from "../../components/basic_css/Header";
import './ImageGameRegistration.css';

const ImageGameRegistration = () => {
    return (
        <div className="app">
            <Header></Header>
            <div className="title-input">
                <textarea 
                className="title-input-textarea"
                placeholder="이미지 게임 제목을 입력해 주세요"
                ></textarea>
            </div>
            <div className="content-input">
            <textarea
                className="content-input-textarea"
                placeholder="# 논란의 소지가 있는 게시물은 삭제될 수 있습니다.        # 게시물은 신고 여부에 따라 삭제될 수 있습니다.">
                </textarea>
            </div>
            <button className="game-registration-button">등록</button>
        </div>
    );
}
export default ImageGameRegistration;