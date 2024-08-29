import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultWaiting.css';

const ResultWaiting = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const randomTime = Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;
        const timer = setTimeout(() => {
            navigate('/testresult');
        }, randomTime);
    
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="app result-waiting-page">
            <div className="waiting-container">
                <div className="waiting-logo">
                    <img src="/public-img/Main-logo.png" alt="logo" />
                </div>
                <div className="waiting-text">결과 출력 중</div>
                <div className="waiting-img">
                    <img src="/public-img/Loading.gif" alt="waiting" />
                </div>
            </div>
        </div>
    );
};

export default ResultWaiting;