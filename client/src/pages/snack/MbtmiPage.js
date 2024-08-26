import './MbtmiPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { state, useAuth } from '../../auth/AuthContext';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import mbtiData from '../../mbtiData/mbtiData';
import getMyInfo from '../../requests/GetMyInfo';


const AppContainerComponent = () => {
    return (
        <AppContainer />
    );
};

const HeaderComponent = () => {
    return (
        <Header />
    );
};

const Filter = ({ setSelectedMBTI }) => {
    const { isAuthenticated } = useAuth().state;
    const { state } = useAuth();
    const [isMBTIDropdownOpen, setMBTIDropdownOpen] = useState(false);
    const [myData, setMyData] = useState({data:{mbti:'NONE'}}); // 사용자 데이터를 저장할 상태
    const [selectedMBTI, setSelectedMBTIState] = useState(myData.data.mbti || 'INFJ');

    const toggleMBTIDropdown = () => {
        setMBTIDropdownOpen(!isMBTIDropdownOpen);
    };

    const handleSelectMBTI = (mbti) => {
        setSelectedMBTIState(mbti);  // 선택한 MBTI로 상태 업데이트
        setSelectedMBTI(mbti);  // 부모 컴포넌트의 상태 업데이트
        setMBTIDropdownOpen(false);  // 드롭다운 닫기
    };

    useEffect(() => {
        if (myData.data.mbti) {
            setSelectedMBTIState(myData.data.mbti); // myData가 업데이트되면 selectedMBTI 설정
            setSelectedMBTI(myData.data.mbti); // 부모 컴포넌트의 상태 업데이트
        }
    }, [myData]);

    useEffect(() => {
        // 선택한 MBTI에 해당하는 컨텐츠 가져오기
        console.log("MBTMI 페이지 로드");
        const fetchFilteredContent = async () => {
            try {
                await getMyInfo(state, setMyData);
            } catch (error) {
                console.error('컨텐츠 가져오기 실패', error);
            }
        };
        if(state.isAuthenticated) {
            fetchFilteredContent();
        }
    }, [selectedMBTI]); //  선택된 MBTI가 변경될 때마다 useEffect 실행
        
    return (
        <div className="filter-mbtmi">
            <div className="mbtmi-dropdown-title">
                <h3>MBTI별 TMI 대방출!!</h3>
            </div>
            <div className="dropdown-mbtmi">
                <button className="filter-mbtmi-btn" onClick={toggleMBTIDropdown}>▼ {selectedMBTI} </button>
                {isMBTIDropdownOpen && (
                    <div className="dropdown-menu-mbtmi">
                        {Object.keys(mbtiData).map((mbti) => (
                            <button 
                            className="dropdown-item" 
                            key={mbti} 
                            onClick={() => handleSelectMBTI(mbti)}>{mbti}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const MbtmiDetails = ({ selectedMBTI }) => {
    const mbtiInfo = mbtiData[selectedMBTI];

    if (!mbtiInfo || !mbtiInfo.mbtmi) {
        return <div> MBTI들의 TMI가 궁금하다면 <br /> 오른쪽 위의 NONE을 눌러 보고싶은 MBTI를 선택해주세요!</div>;
    }

    const { mbtmi } = mbtiInfo;

    return (
        <div className="mbtmi-details">
            <h3>{mbtmi.title}</h3>
            <p>{mbtmi.content}</p>
            {Object.values(mbtmi).filter(value => typeof value === 'string' && value.endsWith('.png')).map((image, index) => (
                <img key={index} src={image} alt={`${mbtmi.title} ${index + 1}`} />
            ))}
        </div>
    );
};

const MbtmiPage = () => {
    const [selectedMBTI, setSelectedMBTI] = useState('INFJ');

    return (
        <div className="app">
            <AppContainerComponent />
            <HeaderComponent />
            <Filter setSelectedMBTI={setSelectedMBTI} />
            <MbtmiDetails selectedMBTI={selectedMBTI} />
        </div>
    );
}
export default MbtmiPage;