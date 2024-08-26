import React, { createContext, useState } from 'react';

// VoteContext 생성
export const VoteContext = createContext();

// VoteProvider 컴포넌트 정의
export const VoteProvider = ({ children }) => {
    // votes 상태를 정의하고 초기값을 빈 객체로 설정
    const [votes, setVotes] = useState({});

    // addVote함수. 특정 mbtiType의 투표수를 증가시킴
    const addVote = (mbtiType) => {
        setVotes((prevVotes) => ({
            ...prevVotes, // 기존 투표 상태를 복사
            [mbtiType]: (prevVotes[mbtiType] || 0) + 1, // 해당 MBTI 타입의 투표 수를 1 증가
        }));
    };

    // removeVote 함수: 특정 MBTI 타입에 대한 투표를 제거
    const removeVote = (mbtiType) => {
        setVotes((prevVotes) => {
            const newVotes = { ...prevVotes }; // 기존 투표 상태를 복사
            if (newVotes[mbtiType] > 0) {
                newVotes[mbtiType] -= 1; // 해당 MBTI 타입의 투표 수를 1 감소
            }
            return newVotes;
        });
    };

    return (
        <VoteContext.Provider value={{ votes, addVote, removeVote }}>
            {children}
        </VoteContext.Provider>
    );
};