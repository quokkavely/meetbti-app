import { useEffect } from "react";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

export default () =>{
	// 배포한 자신의 사이트
    const realUrl = `http://meetbti.s3-website.ap-northeast-2.amazonaws.com/testresult`
    // 로컬 주소 (localhost 3000 같은거)
    const resultUrl = window.location.href;
    
    // 재랜더링시에 실행되게 해준다.
    useEffect(()=>{
    	// init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        Kakao.init('c0fb15cf82b69c5f37ccc7fff922633d');
        // 잘 적용되면 true 를 뱉는다.
        console.log(Kakao.isInitialized());
    },[]);

    const shareKakao = () =>{

        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: 'MBTI 테스트 결과가 도착했어요',
                description: '이미지는 안 나오는 거 맞나요',
                imageUrl:
                `${process.env.REACT_APP_API_URL}/public-img/img-testresult.png`,
                link: {
                    mobileWebUrl: realUrl,
                },
            },
            buttons: [
                {
                    title: '나도 테스트 하러가기',
                    link: {
                    mobileWebUrl: realUrl,
                    },
                },
                ],
            });
    }
      
    return(
        <>
            <button 
                className='navigate-button'
                onClick={() => {
                    shareKakao()
                }}
                
            > <img src="/public-img/logo-share(pink).png" alt="home"/> </button>
        </>
    )
}