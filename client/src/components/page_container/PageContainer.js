import { useEffect, useState } from 'react';
import './PageContainer.css';

const getPageRange = (currentPage, pageInfo) => {

    /* console.log('currentPage: ', currentPage);
    console.log('pageInfo: ', pageInfo); */

    // currentPage를 중심으로 범위 2칸을 잡는다 가정
    let leftEnd = currentPage - 2;
    let rightEnd = currentPage + 2;
    // 배열의 왼쪽 끝이 1에서 몇 만큼 모자란지, ex: -1이면 2만큼 모자라고 오른쪽으로 2칸 밀어야함
    const leftOffset = 1 - leftEnd;

    if(leftOffset > 0){
        leftEnd += leftOffset;
        rightEnd += leftOffset;
    }
    // 오른쪽 끝이 범위를 벗어나면 자르기
    rightEnd = Math.min(rightEnd, pageInfo.totalPage);

    /* console.log('leftEnd: ', leftEnd);
    console.log('rightEnd: ', rightEnd); */

    let array = [];

    for(let i = leftEnd; i<= rightEnd; i++){
        array.push(i);
    }
    // 최종 배열 생성
    return array;
}

const PageContainer = ({ currentPage, pageInfo, getPage, setPageOriginal }) => {
    const [page, setPage] = useState(currentPage);
    const [range, setRange] = useState(getPageRange(currentPage, pageInfo));

    useEffect(() => {
        setRange(getPageRange(currentPage, pageInfo));
    }, [currentPage, pageInfo] );

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
                {range.map((value)=> <button 
                className="page-button" 
                onClick={() => {
                    if(page === value){
                        return;
                    }
                    console.log('value: ', value);
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