import styles from './homepagebody.module.css';
import { Content } from 'next/font/google';
import React from 'react';



const Homepagebody = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.panel} ${styles.Austria}`}>
        <h1 className={styles.text}>Austria</h1>
      </div>
      <div className={`${styles.panel} ${styles.Finland}`}>
        <h1 className={styles.text}>Finland</h1>
      </div>
      <div className={`${styles.panel} ${styles.Greece}`}>
        <h1 className={styles.text}>Greece</h1>
      </div>
    </div>
  );
};

export default Homepagebody;