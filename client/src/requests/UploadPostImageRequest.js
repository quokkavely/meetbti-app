const sendUploadPostImageRequest = async(state, imageFile, executeAfter) => {
    try{
        console.log('imageFile: ', imageFile);

        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/upload-image`,
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
            console.log('이미지 첨부 성공');
            const data = await response.text();
            console.log('data: ', data);
            
            executeAfter(data);

        }else{
            console.log('이미지 첨부 실패: ', response.status);
        }
    } catch (error){
        console.error('이미지 첨부 실패', error);
    }
}
export default sendUploadPostImageRequest;