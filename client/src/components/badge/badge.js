import React from 'react';

const Badge = ({ mbtiType, color }) => {
    const badgeStyle = {
        backgroundColor: color,
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '20px',
        display: 'inline-block',
        margin: '5px',
        width: '90px',
        height: '36px',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '0 auto',
    };

    return <span style={badgeStyle}>{mbtiType}</span>;
};

export default Badge;