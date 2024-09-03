"use client"

import { useState, useEffect } from "react"
import { ArrowBigLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"

import axios from "axios"
import BASE_URL from "@/core"
import Navbar from "@/components/Navbar"
import { Loader2 } from "lucide-react"



interface Employee {
  id?: number
  name: string
  email: string
  role: "User" | "Admin" | "Moderator"
}



export default function EmployeePage() {
  const [Employees, setEmployees] = useState<Employee[]>([]) // Fetch employees from backend
  const [isOpen, setIsOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)
  const [load, setLoad] = useState(false)
  const router = useRouter()
  // Fetch Employees on mount
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoad(true)
      try {
        const response = await axios.get(`${BASE_URL}/employee/get`, { withCredentials: true })
        setEmployees(response.data.data)
        setLoad(false)
      } catch (error) {
        console.error("Failed to fetch employees", error)
        setLoad(false)
      }
    }

    fetchEmployees()
  }, [])

  const handleOpenDialog = (employee: Employee | null = null) => {
    setCurrentEmployee(employee)
    setIsOpen(true)
  }

  const handleCloseDialog = () => {
    setCurrentEmployee(null)
    setIsOpen(false)
  }

  // Create new employee
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newEmployee: Employee = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as ("User" | "Admin" | "Moderator"),
    }
    setLoad(true)
    try {
      const resp = await axios.post(`${BASE_URL}/employee/create`, newEmployee, { withCredentials: true })
      const createdEmployee = resp.data.data
      setEmployees([...Employees, createdEmployee])
      setLoad(false)
      handleCloseDialog()
    } catch (error) {
      console.error("Error creating employee", error)
      setLoad(false)
    }
  }

  // Update existing employee
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const updatedEmployee: Employee = {
      ...currentEmployee,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as ("User" | "Admin" | "Moderator"),
    }
    setLoad(true)

    try {
      await axios.patch(`${BASE_URL}/employee/update/${currentEmployee?.id}`, updatedEmployee, { withCredentials: true })
      setEmployees(Employees.map(emp => emp.id === currentEmployee?.id ? updatedEmployee : emp))
      setLoad(false)
      handleCloseDialog()

    } catch (error) {
      console.error("Error updating employee", error)
      setLoad(false)
    }
  }

  // Delete employee
  const handleDelete = async (id: any) => {
    setLoad(true)
    try {
      await axios.delete(`${BASE_URL}/employee/delete/${id}`, { withCredentials: true })
      setEmployees(Employees.filter(emp => emp.id !== id))
      setLoad(false)
    } catch (error) {
      console.error("Error deleting employee", error)
      setLoad(false)
    }
  }

  return (
    <>
      <div className="flex justify-start p-[1rem]">
        <ArrowBigLeft onClick={() => router.push("/")} className="cursor-pointer" />
      </div>
      <div className="container mx-auto py-10 min-h-screen grid">
        <div className="flex flex-col gap-[1rem] w-full">
          <h1 className="text-2xl font-bold">Employee Management</h1>
          <div className="mb-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="mr-2 h-4 w-4" /> Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{currentEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
                  <DialogDescription>
                    {currentEmployee ? "Edit the employee details below." : "Fill in the details for the new employee."}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={currentEmployee ? handleUpdate : handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={currentEmployee?.name || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        defaultValue={currentEmployee?.email || ""}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Role
                      </Label>
                      <select name="role" defaultValue={currentEmployee?.role || ""}>
                        <optgroup>
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                          <option value="Moderator">Moderator</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">{currentEmployee ? "Update" : "Add"} Employee</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          {load ? <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div> : <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <Button variant="outline" className="mr-2" onClick={() => handleOpenDialog(employee)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(employee.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>}
        </div>
      </div>
    </>
  )
}
