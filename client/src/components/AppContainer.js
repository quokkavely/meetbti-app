import React from 'react';

const AppContainer = ({ children }) => {
  return (
    <div className="app">
      {children}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          max-width: 480px; /* 모바일 크기 */
          margin: 0 auto; /* 중앙 정렬 */
          padding: 20px; /* 패딩 추가 */
        }
      `}</style>
    </div>
  );
};

export default AppContainer;