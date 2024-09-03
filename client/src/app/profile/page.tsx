"use client"
import { useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowBigLeft, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UpdatedShadcnProfileSection() {
    const manager = useSelector((state: any) => state.manager)
    const router = useRouter()
    console.log(manager)
    const userDetails = [
        { id: "USR001", name: "Alex Johnson", email: "alex.johnson@example.com", role: "Full Stack Developer" },
        { id: "USR002", name: "Sarah Lee", email: "sarah.lee@example.com", role: "UX Designer" },
        { id: "USR003", name: "Mike Brown", email: "mike.brown@example.com", role: "Project Manager" },
    ]

    return (
        <>
            <div className="flex justify-start p-[1rem]">
                <ArrowBigLeft onClick={() => router.push("/")} className="cursor-pointer" />
            </div>
            <Card className="w-full max-w-3xl mx-auto mt-[2rem]">
                <CardHeader className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold">{manager.Mname} Profile</CardTitle>
                        <CardDescription>View your employee information</CardDescription>
                    </div>

                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {manager.Employees?.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={() => router.push('/employees')}>Edit Employee</Button>
                </CardFooter>
            </Card>
        </>
    )
}