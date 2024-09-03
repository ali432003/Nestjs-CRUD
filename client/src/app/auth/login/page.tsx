'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from 'next/link'
import axios from 'axios'
import BASE_URL from '@/core'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/manager/manager'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState<any>({})

    const validateForm = () => {
        const newErrors: any = {}

        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid'
        if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const dispatch = useDispatch()
    const router = useRouter()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (validateForm()) {
            console.log('Logi submitted:', { email, password, agreed })
            // Here you would typically send the data to your server
            try {
                const resp = await axios.post(`${BASE_URL}/manager/auth/login`, { email: email, password: password }, { withCredentials: true })
                console.log(resp.data)
                dispatch(login(resp.data))
                router.push("/")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='grid place-items-center min-h-screen'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login to your account to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="john@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                            </div>
                            <div className="flex items-center space-x-2 mt-3 divide-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={agreed}
                                    onCheckedChange={() => setAgreed(!agreed)}
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    I agree to the terms of service
                                </label>
                            </div>
                            {errors.agreed && <p className="text-sm text-red-500">{errors.agreed}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col gap-y-2'>
                    <Button className="w-full" onClick={handleSubmit}>Login</Button>
                    <div>
                        <p>Already have an account? <Link href="/auth/signup" className='text-blue-500 hover:underline'>Signup</Link></p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}