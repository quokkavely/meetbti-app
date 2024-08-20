import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultWaiting.css';

const ResultWaiting = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/testresult');
        }, 8000);
    
    
    return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="app result-waiting-page">
            <div className="waiting-container">
                <div className="waiting-logo">
                    <img src="Main-logo.png" alt="logo" />
                </div>
                <div className="waiting-text">결과 출력 중</div>
                <div className="waiting-img">
                    <img src="Loading.gif" alt="waiting" />
                </div>
            </div>
        </div>
    );
};

export default ResultWaiting;