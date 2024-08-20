import React from 'react';

const styles = {
    appOrigin: {
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    },
    app: {
        maxWidth: '480px',
        margin: '0 auto',
        padding: '0 20px 20px 20px',
    }
}

const AppContainer = () => {
  return (
    <div style={styles.app}>
    </div>
  );
};

export default AppContainer;