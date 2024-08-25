import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/basic_css/Header";
import './ImageGameRegistration.css';

const ImageGameRegistration = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        try {
            const newGame = {
                id: Date.now(), // 고유 ID 생성
                title: title,
                heartCount: 0,
                commentCount: 0,
                isParticipated: false,
            };

            // 기존 게임 목록 가져오기
            const games = JSON.parse(localStorage.getItem('games')) || [];
            // 새로운 게임 추가
            games.push(newGame);
            // 로컬 스토리지에 저장
            localStorage.setItem('games', JSON.stringify(games));

            // 콘솔에 등록 상태 표시
            console.log('새로운 게임이 성공적으로 등록되었습니다:', newGame);

            // 이미지 게임 메인페이지로 이동
            navigate('/imagegame');
        } catch (error) {
            console.error('게임 등록 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div className="app">
            <Header></Header>
            <div className="content-input">
                <div className="content-input-textarea">
                    # 논란의 소지가 있는 게시물은 삭제될 수 있습니다.<br />
                    # 게시물은 신고 여부에 따라 삭제될 수 있습니다.
                </div>
            </div>
            <div className="title-input">
                <textarea 
                className="title-input-textarea"
                placeholder="이미지 게임 제목을 입력해 주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                ></textarea>
            </div>
            <div className="game-registration-button-container">
                <button className="game-registration-button" onClick={handleRegister}>등록</button>
            </div>
        </div>
    );
}
export default ImageGameRegistration;