import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateManagerDTO } from 'src/dto/manageer/manager-create.dto';
import { prisma } from "../../prisma/index"
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { loginManagerDTO } from 'src/dto/manageer/manager-login.dto';
import { RequestWithUser } from 'src/middleware/auth.middleware';



@Injectable()
export class ManagerService {
    constructor(private readonly jwtService: JwtService) { }

    async signup(req: Request, res: Response, createManagerDto: CreateManagerDTO) {
        const { Mname, gender, email, password } = createManagerDto

        const alreadyExist = await prisma.manager.findUnique({
            where: {
                email: email
            }
        })

        if (alreadyExist) {
            throw new BadRequestException('email already taken')
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const resp = await prisma.manager.create({
            
            data: {
                Mname: Mname,
                gender: gender,
                email: email,
                password: hashPassword
            }
        })

        const id = resp?.Mid

        const hart = await this.jwtService.signAsync({
            Mname, email, id
        })

        res.cookie('token', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400000) // 24 hours expiry
        })

        return res.status(200).json({ data: resp, message: "User Created" })
    }

    async login(req: Request, res: Response, LoginManagerDTO: loginManagerDTO) {
        const { email, password } = LoginManagerDTO

        const userExist = await prisma.manager.findUnique({
            where: {
                email: email
            }
        })

        if (!userExist) {
            throw new NotFoundException("User not exist")
        }
        const userPass = bcrypt.compare(password, userExist.password)

        if (!userPass) {
            throw new BadRequestException("Invalid Credentials")
        }

        const hart = await this.jwtService.signAsync({
            userName: userExist.Mname,
            email: userExist.email,
            id: userExist.Mid
        })

        res.cookie('token', hart, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 86400000) // 24 hours expiry
        });

        return res.json({
            data: userExist,
            message: "login successful",
            token: hart
        })
    }

    async logout(req: RequestWithUser, res: Response) {
        try {
            res.clearCookie('token')
            return res.json({ message: "logout succesfull" })
        } catch (error) {
            return res.json({ message: error.message })
        }
    }

    async profile(req: RequestWithUser, res: Response) {
        try {
            const _id = req.currentUser.id


            const manager = await prisma.manager.findUnique({ where: { Mid: _id }, include: { Employees: true } })
            if (!manager) {
                throw new NotFoundException("Manager Not Exist")
            }
            return res.json({ message: "manager fetched", data: manager })
        } catch (error) {
            return res.json({ error: error.message })
        }
    }
}
