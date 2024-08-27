import { useEffect, useState } from 'react';
import './PageContainer.css';

const PageContainer = ({ currentPage, pageInfo, getPage, setPageOriginal }) => {
    const [page, setPage] = useState(currentPage);
    let pages = [page];
    if(page > 1){
        pages.push(page - 1);
    }
    if(page > 2){
        pages.push(page - 2);
    }
    for(let i = page + 1; i <= pageInfo.totalPage; i++){
        pages.push(i);
    }
    pages.sort((a,b) => a - b);

    useEffect(() => {

    }, )


    return (
        <div className="page-container">
            <button className='page-button' onClick={() => {
                if(page > 1){
                    getPage(page - 1);
                    setPage(page - 1);
                    if(setPageOriginal !== undefined){
                        setPageOriginal(page - 1);
                    } 
                }
                }}>{'<'}</button>
            <div>
                {pages.map((value)=> <button 
                className="page-button" 
                onClick={() => {
                    if(page === value){
                        return;
                    }
                    getPage(value);
                    setPage(value);
                    if(setPageOriginal !== undefined){
                        setPageOriginal(value);
                    }
                }}
                style={{color: page === value ? '#a883b5' : 'black', fontWeight: page === value ? 'bold' : 100}}
                >{value}</button>)}
            </div>
            <button className='page-button' onClick={() => {
                if(page < pageInfo.totalPage){
                    getPage(page + 1);
                    setPage(page + 1);
                    if(setPageOriginal !== undefined){
                        setPageOriginal(page + 1);
                    }
                }
                }}>{'>'}</button>
        </div>
    );
}
export default PageContainer;