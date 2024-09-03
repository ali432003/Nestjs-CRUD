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

export default function Signup() {
    const [Mname, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState<any>({})

    const validateForm = () => {
        const newErrors: any = {}
        if (!Mname.trim()) newErrors.name = 'Name is required'
        if (!email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid'
        if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (!gender) newErrors.gender = 'Please select a gender'
        if (!agreed) newErrors.agreed = 'You must agree to the terms of service'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const router = useRouter()
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (validateForm()) {
            console.log('Form submitted:', { Mname, email, password, gender, agreed })
            // Here you would typically send the data to your server
            try {
                const resp = await axios.post(`${BASE_URL}/manager/auth/signup`, { Mname: Mname, email: email, password: password, gender: gender })
                console.log(resp.data)
                router.push("/auth/login")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='grid place-items-center min-h-screen'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create your account to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={Mname}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
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
                            <div className="flex flex-col gap-y-3 mb-3">
                                <Label>Gender</Label>
                                <RadioGroup value={gender} onValueChange={setGender} className='flex'>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Male" id="Male" />
                                        <Label htmlFor="Male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Female" id="Female" />
                                        <Label htmlFor="Female">Female</Label>
                                    </div>
                                </RadioGroup>
                                {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
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
                    <Button className="w-full" onClick={handleSubmit}>Sign Up</Button>
                    <div>
                        <p>Already have an account? <Link href="/auth/login" className='text-blue-500 hover:underline'>Login</Link></p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}