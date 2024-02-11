import React from 'react';
import styles from './login.module.css';
import Register from '../../components/Register';
import Navbar from '@/app/components/Navbar';
import { IoCloseCircle } from "react-icons/io5"; 
import Link from 'next/link';

const Page = ({ handleClosePopup }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        
        <h2>Register</h2>
        <Register handleClosePopup={handleClosePopup} />
        <Link href="/">
          
            <IoCloseCircle size={24} style={{ color: 'red' }} /> 
          
        </Link>
      </div>
    </div>
  );
};
export default Page;