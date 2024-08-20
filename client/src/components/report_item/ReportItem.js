import './ReportItem.css';

function ReportItem(props){
    return (
        <div className="report-item">
            <div className="report-info">
                <div className="report-title">{props.type}</div>
                <div className="report-time">{props.time}</div>
            </div>
            {props.checkbox && <input type="checkbox" className="report-checkbox"></input>}
        </div>
    );
}
ReportItem.defaultProps = {
    checkbox: true
}
export default ReportItem;