'use client';
import React, { useState } from 'react'
import '../auth.css';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            })
            const data = await response.json();
            if (data.ok) {
                console.log('Admin registration successful', data);
                toast.success('Admin registration successful', {
                    position: 'top-center',
                });
                window.location.href = '/pages/addworkout';
            }
            else {
                console.error('Admin registration failed', response.statusText);
                toast.success('Admin registration failed', {
                    position: 'top-center',
                });

            }
        } catch (error) {
            toast.error('An error occured during registration');
            console.error('An error occured during registration', error);
        }

    }
    return (
        <div className='formpage'>
            <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Login</button>
        </div>
    )
}

export default LoginPage
