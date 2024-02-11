'use client'
import React, { useEffect } from 'react'
import styles from './addplace.module.css'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function UpdatePlacePopup({ setOpenPopup, placeId, updatePlaceDetails, countries }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [imageMain, setMainImg] = useState("");
    const [image, setImg] = useState("");
    const [country, setCountry] = useState("");
    // const [errmsg, setErrMsg] = useState("");

    useEffect(() => {
        if (placeId) {
            fetch(`http://localhost:7000/places/getPlaces/${placeId}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setCountry(data.country);
                    setDesc(data.description);
                    setName(data.name);
                    setMainImg(data.imageMain);
                    setImg(data.image);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [placeId]);

    const handleClick = () => {
        setOpenPopup(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('country', country);
        formData.append('description', description);
        formData.append('imageMain', imageMain);
        formData.append('image', image);
        fetch(`http://localhost:7000/places/update/${placeId}`, {
            method: 'PUT',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
                // setErrMsg(data.message);
                toast.success(data.message);
                updatePlaceDetails();
            })
            .catch((error) => {
                console.error('Error:', error);
                // setErrMsg(error.message);
                toast.error(error.message);
            });
    }

    const handleMainImgChng = (e) => {
        setMainImg(e.target.files[0]);
    };
    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };

    return (

        <div className={styles.container}>
            <div className={styles.text}>
                Update Places
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Name</label>
                        <input type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.labelimg}>Main Image</label>
                        <input type='file'
                            accept="image/*"
                            onChange={handleMainImgChng}
                        />
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Image</label>
                        <input type='file'
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </div>

                    <div className={styles.inputdata} >
                        <label className={styles.msg}>Description</label>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={description}
                        />
                    </div>
                </div>
                <div className={styles.inputdata} >
                    <label className={styles.label}>Country</label>
                    <select
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className={styles.option}>
                        {countries.map((country, index) => (
                            <option key={index}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className={styles.button}>Submit</button>
                <button className={styles.button} onClick={handleClick}>Cancel</button>
            </form>
            {/* <div>{errmsg}</div> */}
        </div>

    )
}
