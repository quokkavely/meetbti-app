import React from 'react';
import mbtiData from '../../mbtiData/mbtiData';

const styles = {
    
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '5px',
        marginTop: '20px',
    },
    profile: {
        width: '55px',
        height: '50px',
        borderRadius: '100%',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '15px',
    },
    badge: {
        width: '60px',
        height: '22px',
        fontSize: '15px',
        borderRadius: '10px',
        // alignItems: 'center',
        // justifyContent: 'center',
        paddingTop: '2px',
        textAlign: 'center',
        backgroundColor: 'mbtiData.[mbti].color',
        color: '#ffffff',
    },
    name: {
        width: '250px',
        height: '20px',
        fontSize: '15px',
        color: '#3C3C3C',
        textAlign: 'left',
        // marginLeft: '10px',
        marginTop: '4px',
        fontWeight: 'bold',
    }
};

const UserInfoContainer = ({ author, mbti, profileImage }) => {

    const mbtiColor = mbti && mbtiData[mbti] ? mbtiData[mbti].color : '#ffffff';
    console.log(mbti, mbtiData[mbti]);
    return (
        <div style={styles.container}>
            <img src={profileImage===null ? `/mbti-img/${mbti}.png` : profileImage} alt="프로필 이미지" style={styles.profile} />
            <div style={styles.info}>
                <div style={{ ...styles.badge, backgroundColor: mbtiColor}}>{mbti}</div>
                <div style={styles.name}>{author}</div>
            </div>
        </div>
    );
};

export default UserInfoContainer;