import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsEnum(["Admin", "Moderator", "User"], {
        message: "role doesn't exist"
    })
    role: "Admin" | "Moderator" | "User"

    @IsNotEmpty()
    @IsEmail({}, { message: "Invalid Email" })
    email: string
}