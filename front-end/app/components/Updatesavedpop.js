'use client'
import React from 'react'
import styles from './addplace.module.css'
import { useState, useEffect } from 'react'
import { format } from 'date-fns';
import { toast } from 'sonner'

export default function Updatesavedpop({ setOpenPopup, updatedSaveditems, saveditemsId }) {
    const [country, setCountry] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");

    const handleClick = () => {
        setOpenPopup(false);
    }

    useEffect(() => {
        if (saveditemsId) {
            console.log(saveditemsId);
            fetch(`http://localhost:7000/saveditems/get/${saveditemsId}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setCountry(data.country);
                    setPlace(data.place);
                    setDate(data.date);
                    setEmail(data.email);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [saveditemsId]);

    // console.log(saveditemsId);

    const onSubmit = async (e) => {
        e.preventDefault()
        console.log({ country, place, email, date });
        const formData = new FormData();
        formData.append('country', country);
        formData.append('place', place);
        formData.append('email', email);
        formData.append('date', new Date(date).toISOString());
        // console.log(formData.get('country'));
        fetch(`http://localhost:7000/saveditems/update/${saveditemsId}`, {
            method: 'PUT',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                toast.success(data.message);
                updatedSaveditems();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Update Saveditems
            </div>
            <form onSubmit={onSubmit}>
                <div className={styles.formrow} >
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Customer mail</label>
                        <input type='text'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email} />
                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.labelimg}>Country</label>
                        <input type='text'
                            onChange={(e) => setCountry(e.target.value)}
                            value={country} />
                    </div>
                </div>
                <div className={styles.formrow} >
                    <div className={styles.inputdata}>
                        <label >Place</label>
                        <input type='text'
                            onChange={(e) => setPlace(e.target.value)}
                            value={place} />

                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.date}>Date</label>
                        <input
                            type='text'
                            onChange={(e) => setDate(e.target.value)}
                            value={new Date(date).toLocaleString('en-GB', { timeZone: 'UTC' })}
                        />
                    </div>
                </div>
                <button type="submit" className={styles.btn}>Submit</button>
                <button className={styles.cnl} onClick={handleClick}>Cancel</button>
            </form>

        </div>
    )
}
