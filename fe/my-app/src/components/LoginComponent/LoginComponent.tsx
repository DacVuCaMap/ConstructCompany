"use client"
import LoginRequest from '@/Request/LoginRequest';
import { saveCookieUser, userData } from '@/data/authenticate';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function LoginComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemember, setRemember] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const route = useRouter();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password)
        setErrorLogin(false);
        const url = process.env.NEXT_PUBLIC_API_URL + "/api/auth/login";
        const data: LoginRequest = new LoginRequest(email, password, isRemember);
        try {
            const response = await axios.post(url, data, { withCredentials: true });
            console.log(response);
            saveCookieUser(response.data);
            console.log(userData());
            // window.location.href='/';
        } catch (error) {
            console.log(error)
            setPassword('');
            setErrorLogin(true);
        }

    }
    return (
        <div className="h-full flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    {errorLogin && <span className='text-red-500'>Tài khoản hoặc mật khẩu không hợp lệ</span>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</button>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="remember" className="flex items-center">
                            <input type="checkbox" id="remember" checked={isRemember} onChange={() => setRemember(!isRemember)} className="mr-2" />
                            <span className="text-sm text-gray-700">Remember me</span>
                        </label>
                    </div>
                </form>

            </div>
        </div>
    )
}
