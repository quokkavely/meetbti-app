import React from 'react';

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    height: '600px',
    position: 'relative',
  },
  modalContentMain: {
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    height: '250px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
    textAlign: 'center',
    backgroundColor: '#dedede',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
    fontSize: '20px',
    color: 'rgb(0, 0, 0)',
  },
  buttonEnterSection: {
    position: 'absolute',
    bottom: '150px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  buttonEnter: {
    backgroundColor: '#65558F',
    color: 'white',
    width: '120px',
    height: '40px',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '16px',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '10px',
    width: '120px',
    height: '100px',
    marginLeft: '10px',
  },
};

const AlertModal = ({ showModal, closeModal, handleRadioChange, handleReport, selectedReason }) => {
  if (!showModal) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={styles.modalContentMain}>
          <span style={styles.closeButton} onClick={closeModal}>&times;</span>
          <h2>신고 사유</h2>
          <div style={styles.checkboxContainer}>
            <div style={styles.checkboxGroup}>
              <label>
                <input
                  type="radio"
                  name="reportReason"
                  value="abuse"
                  checked={selectedReason === 'abuse'}
                  onChange={handleRadioChange}
                />
                욕설 및 비방
              </label>
              <label>
                <input
                  type="radio"
                  name="reportReason"
                  value="malicious"
                  checked={selectedReason === 'malicious'}
                  onChange={handleRadioChange}
                />
                악의적 게시
              </label>
            </div>
            <div style={styles.checkboxGroup}>
              <label>
                <input
                  type="radio"
                  name="reportReason"
                  value="sexual"
                  checked={selectedReason === 'sexual'}
                  onChange={handleRadioChange}
                />
                성적인 발언
              </label>
              <label>
                <input
                  type="radio"
                  name="reportReason"
                  value="repetitive"
                  checked={selectedReason === 'repetitive'}
                  onChange={handleRadioChange}
                />
                같은 내용 반복
              </label>
            </div>
          </div>
        </div>
        <div style={styles.buttonEnterSection}>
          <button style={styles.buttonEnter} onClick={handleReport}>신고하기</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;