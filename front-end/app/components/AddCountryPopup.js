'use client'
import React from 'react'
import styles from './addplace.module.css'
import { useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'sonner'

export default function AddCountryPopup({ setOpenPopup, setCountryDetail }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [image, setImg] = useState();
    // const [errmsg, setErrMsg] = useState("");

    const handleClick = () => {
        setOpenPopup(false);
    }

    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('image', image);
            console.log(formData.get('image'));
            const response = await axios.post('http://localhost:7000/countries/addCountry', formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                },
            });

            if (response.status === 201) {
                console.log(response.data);
                // const responseData = await response.json();
                const updatedData = await fetch('http://localhost:7000/countries').then(res => res.json());
                setCountryDetail(updatedData);
                setName("");
                setDesc("");
                setImg("");
                // setErrMsg(response.data.message);
                toast.success(response.data.message);
            } else {
                // setErrMsg(`Error: ${response.statusText}`);
                toast.error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            // setErrMsg(`Error: ${error.message}`);
            toast.error(`Error: ${error.message}`);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Add Country
            </div>
            <form onSubmit={onSubmit}>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Name</label>
                        <input type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div className={styles.inputdata}>
                    <label className={styles.labelimg}>Description</label>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={description}
                            required
                        />
                        
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata} >
                    <label className={styles.label}>Image</label>
                        <input type='file'
                            onChange={handleImgChange}
                            accept='image/*'
                            required
                        />
                    </div>
                </div>
                <button type="submit" className={styles.btn}>Submit</button>
                <button className={styles.cnl} onClick={handleClick}>Cancel</button>
            </form>
        </div>
    )
}
