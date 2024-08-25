import './MbtmiPage.css';
import { useState, useEffect } from 'react';
import AppContainer from '../../components/basic_css/AppContainer';
import Header from '../../components/basic_css/Header';
import mbtiData from '../../mbtiData/mbtiData';


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
    const [isMBTIDropdownOpen, setMBTIDropdownOpen] = useState(false);
    const [selectedMBTI, setSelectedMBTIState] = useState('INFJ');

    const toggleMBTIDropdown = () => {
        setMBTIDropdownOpen(!isMBTIDropdownOpen);
    };

    const handleSelectMBTI = (mbti) => {
        setSelectedMBTIState(mbti);  // 선택한 MBTI로 상태 업데이트
        setSelectedMBTI(mbti);  // 부모 컴포넌트의 상태 업데이트
        setMBTIDropdownOpen(false);  // 드롭다운 닫기
    };

    useEffect(() => {
        // 선택한 MBTI에 해당하는 컨텐츠 가져오기
        const fetchFilteredContent = async () => {
            try {
                const response = await fetch(`http:localhost:8000/mbti-result/${selectedMBTI}`); //MBTI에 따라 API호출
                const data = await response.json();
 
            } catch (error) {
                console.error('컨텐츠 가져오기 실패', error);
            }
        };
        fetchFilteredContent();
    }, [selectedMBTI]); //  선택된 MBTI가 변경될 때마다 useEffect 실행
        
    return (
        <div className="filter-mbtmi">
            <div className="mbtmi-dropdown-title">
                <h3>내 MBTI의 TIM는?!</h3>
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
        return <div>선택한 MBTI에 대한 TMI 정보를 찾을 수 없습니다.</div>;
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