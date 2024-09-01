// components/LogoutButton.js
"use client";

import { useRouter } from 'next/navigation';
import React from 'react';
import axios from 'axios';
import BASE_URL from '@/core';

const LogoutButton = () => {
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const resp = await axios.post(`${BASE_URL}/manager/auth/logout`, { withCredentials: true })
            if (!resp.data) {
                throw new Error("Error in Logout")
            }
            
            console.log(resp.data)
            router.push("/auth/login")
        } catch (error: any) {
            console.log(error.message)
        }
    }
  return (
    <button onClick={handleLogout} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
      Logout
    </button>
  );
};

export default LogoutButton;
