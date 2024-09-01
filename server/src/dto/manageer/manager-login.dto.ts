import { IsEmail, IsNotEmpty } from "class-validator"

export class loginManagerDTO {

    @IsNotEmpty({ message: "Email required" })
    @IsEmail()
    email: string

    @IsNotEmpty({ message: "password required" })
    password: string
}