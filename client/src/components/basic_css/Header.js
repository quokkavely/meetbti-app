import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onBackClick }) => {
    const navigate = useNavigate();
    return (
      <header style={styles.Header} className="header">
        <div style={styles.logoBox} className="logo-box">
          <div style={styles.logoImg} className='logo-img' onClick={() => navigate('/')}>
            <img src="/public-img/Main-logo-light.png" alt='메인로고'/>
          </div>
          <div style={styles.backIcon} className="back-icon" onClick={onBackClick || (() => navigate(-1))}>
            <img src="/public-img/back(purple).png" alt='뒤로 가기' />
          </div>
        </div>
        {/* <div style={styles.logoText} className="logo-text">
          <h1>본격 MBTI 커뮤니티!</h1>
        </div> */}
      </header>
    );
  };

  const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100px',
        padding: '10px',
        marginTop: '26px',
      },
      logoBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      },
      logoImg: {
        display: 'flex',
        alignItems: 'center',
        width: '200px',
        height: '50px',
      },
      backIcon: {
        width: '36px',
        height: '36px',
        marginRight: '10px',
      }
    };

  export default Header;