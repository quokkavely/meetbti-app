import { useState } from "react";
import sendUploadProfileImageRequest from "../../requests/UploadProfileImageRequest";
import { useAuth } from '../../auth/AuthContext';
import sendMemberPatchRequest from "../../requests/MemberPatchRequest";

const ImageInputModal = ({ isOpen, closeModal }) => {
    const { state } = useAuth();
    const [file, setFile] = useState();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const modifyProfileImage = () => {
        if(file === undefined){
            alert('먼저 파일을 업로드해 주세요');
            return;
        }
        sendUploadProfileImageRequest(state, file, 
            (data)=> {sendMemberPatchRequest(state, {image: data});
            closeModal();
        });
    }

    return(
        <div className="image-input-modal-background">
            <div className="image-input-modal">
                <button className="close-button" onClick={closeModal}>X</button>
                <img className='profile-placeholder' src="public-img/catprofile.png"></img>
                <div className="input-description">최대 10MB까지의 파일만 등록할 수 있어요</div>
                <input type="file" className = 'file-input-button' onChange={handleFileChange} />
                <button className="change-profile-confirm-button" onClick={() => modifyProfileImage()}>등록</button>
            </div>
        </div>
    );
}
export default ImageInputModal;