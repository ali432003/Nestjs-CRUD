import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"


export class CreateManagerDTO {
    @IsNotEmpty({ message: "Field should be filled n" })
    @IsString()
    Mname: string

    @IsNotEmpty({ message: "Field should be filled e" })
    @IsEmail({}, { message: "Email is not valid" })
    email: string

    @IsNotEmpty({ message: "Field should be filled p" })
    password: string

    @IsEnum(["Male", "Female"], { message: "Not a Valid Gender" })
    gender: "Male" | "Female"
}