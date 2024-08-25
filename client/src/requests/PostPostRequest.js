const sendPostPostRequest = async(state, contentObject, navigate) => {
    console.log('token: ', state.token);
    console.log('content: ', contentObject);

    const formData = new FormData();
    formData.append('title', contentObject.title);
    formData.append('content', contentObject.content);
    formData.append('category', contentObject.category);
    if(contentObject.image instanceof File){
        formData.append('file', contentObject.image);
    }
    try{
        const response = await fetch('http://localhost:8080/posts',
            {
                method: 'POST',
                headers: {
                    /* 'content-Type': 'application/json', */
                    'Authorization': `${state.token}`,
                },
                /* body: JSON.stringify(contentObject), */
                body: formData,
            }
            
        );
        if(response.ok){
            console.log('게시글 등록 성공');
            navigate('/MBTIBoard');
        }else{
            console.log('게시글 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('게시글 등록 실패', error);
    }
}
export default sendPostPostRequest;