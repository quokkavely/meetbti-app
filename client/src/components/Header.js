import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header style={styles.Header} className="header">
      <div style={styles.logoBox} className="logo-box">
        <div style={styles.logoImg} className='logo-img' onClick={() => navigate('/')}>
          <img src="/Main-logo.png" alt='메인로고' />
        </div>
        <div style={styles.backIcon} className="back-icon" onClick={() => navigate(-1)}>
          <img src="back(grey).png" alt='뒤로 가기' style={{ width: '50px', height: '50px' }} />
        </div>
      </div>
      <div style={styles.logoText} className="logo-text">
        <h1 >본격 MBTI 커뮤니티!</h1>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '130px',
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
  logoImgImg: {
    width: '170px',
    height: '40px',
  },
  userIconContainer: {
    marginLeft: 'auto',
    width: '30px',
    height: '36px',
    cursor: 'pointer',
  },
  userIconContainerImg: {
    width: '30px',
    height: '36px',
  },
  logoText: {
    textAlign: 'center',
    marginRight: 'auto',
    fontSize: '10px',
    color: '#3C3C3C',
  },
  backIcon: {
    width: '50px',
    height: '50px',
  },
  backIconImg: {
    width: '50px',
    height: '50px',
  }
};

export default Header;