import React from 'react';
import styles from './PreLoader.module.css';
const PreLoader = () => {
  return (
    <React.Fragment>
      <div className={styles['whipik-transition--loader']}>
        <div className={styles['whipik-spinner']}>
          <div className={styles['circle']}></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PreLoader;
