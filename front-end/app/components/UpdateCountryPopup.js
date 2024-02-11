'use client'
import React, { useEffect } from 'react'
import styles from './addplace.module.css'
import { useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function UpdateCountryPopup({ setOpenPopup, updatedCountryDetails, countryId }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [image, setImg] = useState("");
    // const [errmsg, setErrMsg] = useState("");

    const handleClick = () => {
        setOpenPopup(false);
    }

    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
    };

    useEffect(() => {
        if (countryId) {
            console.log(countryId);
            fetch(`http://localhost:7000/countries/getCountry/${countryId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setDesc(data.description);
                    setName(data.name);
                    setImg(data.image);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [countryId]);

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);
        fetch(`http://localhost:7000/countries/update/${countryId}`, {
            method: 'PUT',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                // setErrMsg(data.message);
                // setOpenPopup(false);
                toast.success(data.message);
                console.log(data.message);
                updatedCountryDetails();
            })
            .catch((error) => {
                // setErrMsg(error.message);
                toast.error(error.message);
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Update Country
            </div>
            <form onSubmit={onSubmit}>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Name</label>
                        <input type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.labelimg} >Description</label>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={description}
                        />

                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata} >
                        <label className={styles.label}>Image</label>
                        <input type='file'
                            accept='image/*'
                            onChange={handleImgChange}
                        />
                    </div>
                </div>
                <button type="submit" className={styles.btn}>Submit</button>
                <button className={styles.cnl} onClick={handleClick}>Cancel</button>
            </form>
        </div>
    )
}
