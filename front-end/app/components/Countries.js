'use client'
import React, { useState, useEffect } from 'react';
import styles from './country.module.css';
// import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Link from 'next/link';

function Countries({ country }) {
  const [countrydata, setCountryData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:7000/countries/${country}`)
      .then((res) => res.json())
      .then((data) => {
        setCountryData(data[0]);
      }).catch((error) => {
        console.error('Error fetching country data:', error);
      });
  }, [country]);

  // const [startIndex, setStartIndex] = useState(0);

  // const handleScroll = (direction) => {
  //   const totalImages = 6;
  //   const increment = 3;

  //   if (direction === 'right') {
  //     const newStartIndex = Math.min(startIndex + increment, totalImages - 1);
  //     setStartIndex(newStartIndex);
  //   } else if (direction === 'left') {
  //     const newStartIndex = Math.max(startIndex - increment, 0);
  //     setStartIndex(newStartIndex);
  //   }
  // };

  return (
    <>
      <div>
        <div className={styles.countryContainer}>
          <img
            src={`http://localhost:5000/images/${countrydata.image}`}
            alt="Malta Banner"
            className={styles.bannerImage}
          />
        </div>
        <div className={styles.description}>
          <h1 className="font-bold text-4xl">{countrydata.name}</h1>
          <p>
            {countrydata.description}
          </p>
        </div>
        <div className={styles.imageContainer}>
          {countrydata.places && countrydata.places.map((place) => (
            <div className={styles.imageWithCaption} key={place._id}>
              <Link href={`/countries/${country}/${place.name}`}>
                <img
                  src={`http://localhost:9000/images/${place.image}`}
                  alt={place.name}
                  className={styles.horizontalImage}
                />
              </Link>
              <p className={styles.imageName}>{place.name}</p>
            </div>
          ))}

          {/* <div className={styles.scrollButtons}>
            <button
              className={styles.scrollButton}
              onClick={() => handleScroll('left')}
            >
              <FaAngleLeft />
            </button>
            <div style={{ margin: '0 20px' }}></div>
            <button
              className={styles.scrollButton}
              onClick={() => handleScroll('right')}
            >
              <FaAngleRight />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Countries;