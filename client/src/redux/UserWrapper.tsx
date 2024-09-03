"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { login } from './manager/manager'
import BASE_URL from '@/core'
import { cookies } from 'next/headers'

const UserWrapper = ({ children }: any) => {

    const dispatch = useDispatch()

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/manager/auth/profile`, { withCredentials: true })
                dispatch(login(response.data.data))                                                                                                     
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser()

    }, [])


    return (
        <>{children}</>
    )
}

export default UserWrapper