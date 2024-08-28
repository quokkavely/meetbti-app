import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',
    marginLeft: '10px',
    marginRight: '10px',
  },
  imgContainer: {
    width: '36px',
    height: '36px',
  },
  img: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  mbtiContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5px',
    marginLeft: '2px',
  },
  mbti: {
    fontSize: '10px',
    color: '#ffffff',
    borderRadius: '10px',
    backgroundColor: '#f997da',
    width: '40px',
    height: '12px',
    textAlign: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  name: {
    fontSize: '11px',
    color: '#242424',
    // fontWeight: 'bold',
    width: '40px',
    height: '15px',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
};

const CommentUserInfoContain = ({ username, mbti, profileImage }) => {
  console.log(`/mbti-img/${mbti}.png`);
  return (
    <div style={styles.container}>
      <div style={styles.imgContainer}>
        <img src={profileImage === null ? `/mbti-img/${mbti}.png` : profileImage} alt="catprofile" style={styles.img} />
      </div>
      <div style={styles.mbtiContainer}>
        <div style={styles.mbti}>{mbti}</div>
        <div style={styles.name}>{username}</div>
      </div>
    </div>
  );
};

export default CommentUserInfoContain;