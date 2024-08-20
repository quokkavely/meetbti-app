import Dropdown from "../dropdown/Dropdown";

const ReportHeader = (props) => {
    return (
        <div className="report-header">
            <Dropdown description='카테고리 설정' option={['신고 내역','이미지게임 신청','밸런스게임 신청']}></Dropdown> 
            <button className='report-handling-button'>{props.button}</button>
        </div>
    );
}
export default ReportHeader;