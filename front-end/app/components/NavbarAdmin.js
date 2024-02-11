'use client'
import React from 'react';
import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Navbardata } from './Navbardata';
import { IconContext } from 'react-icons';
import Link from 'next/link';
import styles from './NavbarAdmin.module.css'

function NavbarAdmin() {
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={styles.navMenu}>
          <ul className={styles.navMenuItems}>
            {Navbardata.map((item, index) => {
              return (
                <li key={index}>
                  <Link href={item.path}>
                    <div className={styles.navText}>
                      <div>{item.icon}</div>
                      <div className={styles.title}>{item.title}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default NavbarAdmin;