import Header from "../../components/basic_css/Header";
import './AdminPage.css';
import '../../App.css';

function AdminButton(props){
    return (
        <button className="admin-button">
            <div className="admin-button-contents">
                <img className="admin-button-icon" src={props.img}></img>
                <div className="admin-button-text">
                    {props.content}
                </div>
            </div>
        </button>
    );
}

const AdminPage = () => {
    return (
        <div className="app">
            <Header></Header>
            <h6 className="admin-page-text">🩷관리자 페이지</h6>
            <div className="admin-button-container">
                <AdminButton content='신고 내역' img='history-img.png'></AdminButton>
                <AdminButton content='이미지 게임 관리' img='post-img.png'></AdminButton>
                <AdminButton content='밸런스 게임 관리' img='comment-img.png'></AdminButton>
            </div>
            <img className = 'logo-icon' src="logo-icon.png"></img>
        </div>
    );
}
export default AdminPage;