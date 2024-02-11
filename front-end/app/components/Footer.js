import React from 'react'
import styles from './footer.module.css'
import { FaAddressCard } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { FaCopyright } from "react-icons/fa6";

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.logoContainer}>
                <FaAddressCard size={20} />
                <MdAddIcCall size={20} />
                <MdMarkEmailRead size={20} />
            </div>
            <div className={styles.contact}>

                <h3>Contact Us</h3>
                <ul>
                    <li>
                        Address
                    </li>
                    <li>
                        +49 1234567890
                    </li>
                    <li>
                        wanderlust@gmail.com
                    </li>
                </ul>
            </div>
            <div className={styles.menu}>

                <h3>Menu</h3>
                <ul>
                    <li>
                        Home
                    </li>
                    <li>
                        About
                    </li>
                    <li>
                        Our Room
                    </li>
                    <li>
                        Gallery
                    </li>

                    <li>
                        Contact Us
                    </li>
                </ul>
            </div>
            <div className={styles.new}>
                <h3>News letter</h3>
                <form>
                    <input
                        placeholder="Enter your email"
                        type="text"
                        name="Enter your email" />
                    <button>subscribe</button>
                </form>
            </div>

            <div className={styles.end}>
                <FaCopyright size={15} />
                <p className={styles.para}>
                    2024 Wanderlust Company. All rights reserved.
                    No part of this site may be reproduced without
                    our written permission.
                </p>
            </div>

            <p className={styles.Lang}>
                Language
            </p><select name="Language" className={styles.button}>
                <option value="E">English</option>
                <option value="D">Deutsch</option>
            </select>


        </div>
    )
}

export default Footer;