import './PageContainer.css';

const PageContainer = (props) => {
    return (
        <div className="page-container">
            <button className='page-button'>{'<'}</button>
            <div>
                {props.pages.map((value)=> <button className="page-button">{value}</button>)}
            </div>
            <button className='page-button'>{'>'}</button>
        </div>
    );
}
export default PageContainer;