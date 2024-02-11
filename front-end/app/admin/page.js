'use client';
import React from 'react'
import LoginAdmin from '../components/LoginAdmin'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function page() {
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);
    const [redirected, setRedirected] = useState(false);
    const router = useRouter();

    if (status === "successful" && !redirected) {
        if (role === "admin") {
            router.push('/admin/getCountry');
        } else {
            toast.error("You are not an admin!")
        }
        setRedirected(true);
    }

    return (
        <div>
            <LoginAdmin setRole={setRole} setStatus={setStatus}/>
        </div>
    )
}
