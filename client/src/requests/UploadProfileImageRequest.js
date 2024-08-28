const sendUploadProfileImageRequest = async(state, imageFile, executeAfter) => {
    try{
        console.log('imageFile: ', imageFile);

        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/members/upload-image`,
            {
                method: 'POST',
                headers: {
                    // 'content-Type': 'multipart/form-data',
                    'Authorization': `${state.token}`,
                },
                /* body: JSON.stringify({
                    content: content
                }), */
                body: formData,
            }
            
        );
        if(response.ok){
            console.log('프로필 이미지 등록 성공');
            const data = await response.text();
            console.log('data: ', data);
            
            executeAfter(data);

        }else{
            console.log('프로필 이미지 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('프로필 이미지 등록 실패', error);
    }
}
export default sendUploadProfileImageRequest;