import { useState } from "react";

const ImageInputModal = ({ isOpen, closeModal }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
    }

    return(
        <div className="image-input-modal-background">
            <div className="image-input-modal">
                <button className="close-button" onClick={closeModal}>X</button>
                <img className='profile-placeholder' src="public-img/catprofile.png"></img>
                <div className="input-description">최대 10MB까지의 파일만 등록할 수 있어요</div>
                <input type="file" className = 'file-input-button' onChange={handleFileChange} />
                <button className="change-profile-confirm-button">등록</button>
            </div>
        </div>
    );
}
export default ImageInputModal;