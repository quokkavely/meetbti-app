#  MeetBTI

<p align="center">
오늘은 어떤 옷을 입을까? <br>
2주마다 달라지는 MBTI, Test하고 다른 옷 입어봐요!</p>

<p align="center">
    <img src="https://github.com/user-attachments/assets/2254efff-fc75-4b49-92da-496a65193642" width="400"/>
</p>

<p align="center">
    <strong>MeetBTI</strong>는 사용자가 자신의 MBTI 유형을 정의하고, <br> 성향별로 다양한 카테고리에서 다른 사용자들과 의견을 나누고 소통할 수 있는 커뮤니티 사이트입니다.  <br>  또한, 소소한 즐거움을 더해줄 <strong>Snack Game</strong> 코너도 마련되어 있어, <br>  밸런스 게임과 이미지 게임을 통해 재미있게 시간을 보낼 수 있습니다.
</p>

<br> 
<br> 
  
## 🚩 개요
- 프로젝트 이름 : MeetBTI
- 프로젝트 기간 : 2024.08.09 ~ 2024.08.29
- 배포주소 : [MeetBTI](http://meetbti.s3-website.ap-northeast-2.amazonaws.com)

<br>

> ### 주요 기능
**1. 회원가입 및 로그인**
- 닉네임과 이메일 검증 버튼
- 회원가입 버튼 클릭 시 멤버 정보를 임시로 Redis에 저장, 자동 메일 전송
- 이메일 인증 코드 입력 후 인증 완료 시 회원가입 완료되고 DB에 회원 정보 저장
- 로그인 실패 시 알림창 표시
- 신고 회원 및 탈퇴 회원은 로그인 차단
    
**2. MBTI Test** 
- 질문은 DB에서 더미 데이터로 관리
- 질문에 대한 답변을 배열로 담아 서버에 전송하여 계산하는 로직
- MBTI 결과가 있어야 게시판에 글 작성 가능
    
**3. MBTI 게시판** 
- MBTI 테스트 후에 게시판 접근 가능
- MBTI 테스트 결과에 따라 카테고리 자동 진입
- 게시글에 제목, 내용, 이미지 업로드 가능
- 게시글 작성은 해당 MBTI 카테고리에서만 작성 가능
- 게시글에 대한 댓글은 MBTI Test를 한 모든 사용자는 작성 가능
- 게시글에 대한 좋아요 및 신고 기능 제공
 
**4. Snack Culture (밸런스게임/이미지게임/MBTMI)** 
- 회원은 게임 주제 제안 가능, 관리자가 승인시 참여 가능
- 이미지 게임 참여시 가장 많은 선택을 받은 MBTI의 3순위까지 확인 가능
- 게임 참여 중복 불가 
- MBTMI 기능으로 MBTI 관련 정보 확인 가능
      
**5. 마이페이지**
- MBTI 테스트 기록
- 작성한 게시글 목록
- 내가 남긴 댓글 목록
- 좋아요 목록
- 참여한 게임 확인 가능

**6. 관리자 페이지**
- 신고된 게시글 확인
- 신고 승인 시 해당 계정 정지 및 게시글 자동 삭제
- 회원이 제안한 이미지 게임과 밸런스 게임 주제 승인
- 승인된 게임 주제는 사용자에게 공개
<br><br>

## 🙏Team List

|**박혜지**|**옥성민**|**고경범**|**조한재**|
|:--:|:--:|:--:|:--:|
|<img src="https://github.com/user-attachments/assets/843e48b3-33ca-4443-9f7a-05a8a504f602" width="150px" height="150px">|<img src="https://github.com/user-attachments/assets/a514e921-e0e5-4f5f-a184-a12559d4a827" width="150px" height="150px"> | <img src="https://github.com/user-attachments/assets/ffdb85b6-47d8-4a3f-8dc6-19dc55d6fe49" width="150px" height="150px"> | <img src="https://github.com/user-attachments/assets/e2aab19f-8287-488c-908a-5040f8d247db" width="150px" height="150px">|
|[블리](https://github.com/quokkavely) (팀장)|[옥결](https://github.com/Ockeee)|[꼬마](https://github.com/KoKyungBeom)|[한조](https://github.com/whgkswo)|

<br>

> ### 역할 분담
<img src = "https://github.com/user-attachments/assets/173a11af-84ca-419b-bb36-bf27abd89510" />

## 🔍Page Preview

| 메인 : 회원가입 | 메인 : 이메일 인증 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/8ae543c2-c42d-4843-b344-e7fe59366582" width="400" height="200"/> | <img src="https://github.com/user-attachments/assets/a852f3eb-c782-46cc-9c2d-667d8683a0d9" width="400" height="200"/> |

|  MBTI-TEST  | MBTI - 결과 확인 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/1d88bfff-638a-4e00-b9c2-0814c58a1c5d" width="400" height="200"/> | <img src="https://github.com/user-attachments/assets/a01230c1-dbcb-4ea9-858e-2544dad0184a" width="400" height="200"/> |

| 게시글 작성 | 게시판 카테고리 및 정렬 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/885bbbc8-8f42-4918-abe3-03863b33e2b0" width="400" height="200"/> | <img src="https://github.com/user-attachments/assets/ae84e0f5-07ac-4b25-9d72-085f971155e4" width="400" height="200"/> |

| 댓글 등록 | 게시글 좋아요 및 취소 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/40a7e4e0-95a4-47cf-b67d-509301778ec0" width="400" height="200"/> | <img src="https://github.com/user-attachments/assets/a6390cc8-ba95-4fca-adec-a00b9e8262b6" width="400" height="200"/> |

| 스낵컬처 : 메인 | MBTMI : 카테고리별 컨텐츠 확인 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/35b7e0d8-6454-4641-8d39-27244ee4b21b" width="400" height="200"/> | <img src="https://github.com/user-attachments/assets/430752fc-1e2c-40e3-9c2e-4aa09ec9ee51" width="400" height="200"/> |

| 이미지 게임 : 주제 제안 | 이미지게임 : 관리자 승인 후 주제 목록 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/ff2ed235-f47a-48d4-991a-696dcc8613ab" width="400" height="200"/> | <img src="https://github.com/user-attachments/assets/a1004b1d-07b4-403a-814d-6f1ab44a78c8" width="400" height="200"/> |

| 밸런스게임 : 참여 및 결과 확인 | 밸런스게임 : 댓글 및 좋아요 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/b4a95f00-d472-40c9-8450-fa191a9ee47c" width="400" height="200"/> | <img src="https://github.com/user-attachments/assets/63f052ad-c9d3-4064-a72a-789fe481ea0a" width="400" height="200"/> |

| 이미지게임 : 참여 및 결과 확인  | 이미지게임 : 댓글 및 좋아요 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/15fefaba-a5ac-4783-bfd6-256e8dadd3de" width="400" height="210"/> | <img src="https://github.com/user-attachments/assets/c7415650-b3b6-45a9-bf1a-2a18180f3785" width="400" height="200"/> |

| 마이페이지 : 프로필 사진 수정| 마이페이지 : 닉네임 수정 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/7e671c92-c908-4e9f-b6e2-354db1b6224e" width="400" height="210"/> | <img src="https://github.com/user-attachments/assets/eb18b8b9-60a7-4f78-a19d-38b410a82c1d" width="400" height="200"/> |

| 마이페이지 : 비밀번호 수정 | 마이페이지 : 활동내역 확인 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/bf59889d-a3c4-4abe-9936-6951c630710d" width="400" height="210"/> | <img src="https://github.com/user-attachments/assets/5f4e84a8-de40-45dd-afdb-d5b4e58dfdbd" width="400" height="200"/> |

| 마이페이지 : 테스트 및 게시판 활동내역 | 마이페이지 : 좋아요　활동내역 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/87733598-e7f5-4efc-b38b-d56c05bc30dc" width="400" height="210"/> | <img src="https://github.com/user-attachments/assets/ff4385b4-b233-4e24-9853-99301ee541ba" width="400" height="200"/> |

| 마이페이지 : 스낵컬처　활동내역 | 관리자 페이지 : 회원의 주제 제안 목록 및 승인|
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/16f5ccb8-f144-4e0e-8a4a-c4e91d8994ca" width="400" height="210"/> | <img src="https://github.com/user-attachments/assets/8d7ae3a8-f23f-4902-8384-ce06a6802852" width="400" height="200"/> |

| 게시글 : 회원의 게시글 신고 | 관리자 페이지 : 회원의 신고 목록 및 승인 |
| :---: | :---: |
| <img src="https://github.com/user-attachments/assets/f8430ff2-13d6-42aa-b048-c69f065c7b34" width="400" height="210"/> | <img src="https://github.com/user-attachments/assets/29fe7002-b071-469b-a7d9-4d2bbe53db85" width="400" height="200"/> |

| 로그인 차단: 탈퇴 회원 및 계정 정지 회원 | 
| :---: |
| <img src="https://github.com/user-attachments/assets/cfbd48c2-6ac6-4d27-80ae-4aa9b3a1ee46" width="400" height="210"/> |

<br> 
<br> 


## ✨기술스택

### 공통
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"><img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">
<br>
    
### 백엔드
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"><img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring Boot&logoColor=white"><img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)

![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![SpringSecurity](https://img.shields.io/badge/SpringSecurity-6DB33F.svg?style=for-the-badge&logo=SpringSecurity&logoColor=white)

<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"><img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">

![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![Windows](https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=macos&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
<br>

### 프론트엔드
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">

<br>
<br> 


## 📖 개발 문서

### 사용자 기능 정의서
[MeetBTI-사용자기능정의서](https://docs.google.com/spreadsheets/d/1XMqYRtqulippf7HA2dp9n6sx5ePqxiOyh0XM622ChoM/edit?usp=sharing)

### ERD
[MeetBTI-ERD](https://www.erdcloud.com/d/2rEQpGQChxisYTNtg)

### API 명세서
[MeetBTI-API명세서](https://docs.google.com/spreadsheets/d/1j8DFtbTcbUNgJ1bipurqsfqK9-sYht0wjwLPZMCNEuE/edit?gid=300132535#gid=300132535)




    
