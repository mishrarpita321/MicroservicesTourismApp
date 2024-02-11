import React from 'react'
import styles from './aboutus.module.css'
import Image from 'next/image';
import { IoLogoTwitter } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";

function Aboutus() {
  return (
    <div className={styles.Paris}> 
        <p className={styles.wanderlust}>Wanderlust</p>
        <p className={styles.wanderlustpara}> Wanderlust</p>
        <p className={styles.paragraph}> We envision a world where every traveler can effortlessly 
        discover and connect with the beauty of 10 Schengen countries in Europe. Whether you're 
        a seasoned explorer or a first-time adventurer, Wanderlust is your gateway 
        to a curated selection of enchanting tourist places, each with its own unique 
        charm and cultural significance. </p>
        <div className={styles.logoContainer}>
        {/* <Image
                    src="/Images/twitter.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                    
                /> */}
          <IoLogoTwitter size={30} style={{ marginBottom: '10px',color: 'white' }}/>


        {/* <Image
                    src="/Images/facebook.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                /> */}
            <FaFacebook size={30} style={{ marginBottom: '10px',color: 'white'  }}/>
          

        {/* <Image
                    src="/Images/instagram.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                /> */}
              <RiInstagramFill size={30} style={{ marginBottom: '10px',color: 'white' }}/>

        {/* <Image
                    src="/Images/youtube.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                /> */}
              <FaYoutube size={30} style={{ color: 'white' }} />
                
        </div>
       
    </div>
  )
}

export default Aboutus;