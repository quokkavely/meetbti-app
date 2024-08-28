import Header from "../../components/basic_css/Header";
import './AdminPage.css';
import '../../App.css';
import { Navigate, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    return (
        <div className="app">
            <Header></Header>
            <div className="admin-title">
                <div className="admin-page-text"> 
                    <img src="/public-img/heart-red-img.png" alt="Heart red"/></div>
                <div> 관리자 페이지</div>
            </div>
            <img className = 'logo-icon' src="/public-img/img-testresult.png"></img>
            <div className="admin-button-container" onClick={() => navigate('/report')}>
                <AdminButton content='신고 내역' img='/public-img/history-img.png'></AdminButton>
                <AdminButton content='이미지 게임 관리' img='/public-img/post-img.png'></AdminButton>
                <AdminButton content='밸런스 게임 관리' img='/public-img/comment-img.png'></AdminButton>
            </div>
        </div>
    );
}
export default AdminPage;