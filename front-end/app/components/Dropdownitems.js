
'use client'
import React, { useState, useEffect } from 'react'
import styles from './dropdownitems.module.css'
import Link from 'next/link'


const Dropdownitems = () => {
  const [countries, setCountries] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:7000/countries')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
       
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        
      });
  }, []);

  return (
    <div className={styles.dropdownmenu}>
      <ul className={styles.item}>
        {countries.map((country, index) => (
          <Link href={`/countries/${country.name}`}  >
            <li key={index} className={styles.items} >
              {country.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Dropdownitems;
