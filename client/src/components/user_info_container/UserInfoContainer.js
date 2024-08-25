import React from 'react';

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
        alignItems: 'center',
        marginLeft: '15px',
    },
    badge: {
        width: '70px',
        height: '22px',
        fontSize: '15px',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '2px',
        textAlign: 'center',
        backgroundColor: '#f4c0c0',
        color: '#ffffff',
    },
    name: {
        width: '70px',
        height: '20px',
        fontSize: '15px',
        color: '#3C3C3C',
        textAlign: 'left',
        marginLeft: '10px',
        marginTop: '4px',
        fontWeight: 'bold',
    }
};

const UserInfoContainer = ({ author, mbti }) => {
    return (
        <div style={styles.container}>
            <img src="/public-img/catprofile.png" alt="프로필 이미지" style={styles.profile} />
            <div style={styles.info}>
                <div style={styles.badge}>{mbti}</div>
                <div style={styles.name}>{author}</div>
            </div>
        </div>
    );
};

export default UserInfoContainer;