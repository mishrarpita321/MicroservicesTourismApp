'use client'
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import styles from './adminlogin.module.css'
import { Toaster, toast } from 'sonner';

export default function LoginAdmin({ setRole, setStatus }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:7000/users/admin/login', { email, password })
            .then(res => {
                setRole(res.data.role)
                setStatus(res.data.status)
                console.log(res.data)
                // toast.success(res.data.message);
            }).catch(err => {
                // setErr(err.response.data.message)
                toast.error(err.response.data.message);
            });
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.form}>
                <div className={styles.login}>
                    <div className={styles.loginHeader}>
                        <h3>HI ADMIN !</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>login</button>
                    <Toaster position="bottom-center" richColors duration={5000}/>
                </form>
            </div>
        </div>
    );
}
