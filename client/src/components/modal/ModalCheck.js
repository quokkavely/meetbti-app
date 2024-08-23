import React from 'react';
import './ModalCheck.css';

const Modal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button className='modal-button' onClick={onClose}>확인</button>
            </div>
        </div>
    );
};

export default Modal;