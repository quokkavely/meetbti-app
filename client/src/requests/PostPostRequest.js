const sendPostPostRequest = async(state, contentObject, navigate, data) => {
    console.log('token: ', state.token);
    console.log('contentObject: ', contentObject);
    console.log('image: ', data);

    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`,
            {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': `${state.token}`,
                },
                body: JSON.stringify({
                    title: contentObject.title,
                    content: contentObject.content,
                    category: contentObject.category,
                    image: data,
                }),
            }
            
        );
        if(response.ok){
            console.log('게시글 등록 성공');
            navigate(`/MBTIBoard?category=${contentObject.category}`);
        }else{
            console.log('게시글 등록 실패: ', response.status);
        }
    } catch (error){
        console.error('게시글 등록 실패', error);
    }
}
export default sendPostPostRequest;