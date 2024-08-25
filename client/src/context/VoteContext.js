import React, { createContext, useState } from 'react';

// VoteContext 생성
export const VoteContext = createContext();

export const VoteProvider = ({ children }) => {
    const [votes, setVotes] = useState({});

    const addVote = (mbtiType) => {
        setVotes((prevVotes) => ({
            ...prevVotes,
            [mbtiType]: (prevVotes[mbtiType] || 0) + 1,
        }));
    };

    const removeVote = (mbtiType) => {
        setVotes((prevVotes) => {
            const newVotes = { ...prevVotes };
            if (newVotes[mbtiType] > 0) {
                newVotes[mbtiType] -= 1;
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