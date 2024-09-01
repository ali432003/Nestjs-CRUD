import { BadGatewayException, BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { prisma } from '../../prisma/index';
import { CreateEmployeeDto } from 'src/dto/employee/employee-create.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/employee-update.dto';
import { RequestWithUser } from 'src/middleware/auth.middleware';
import { Response } from 'express';



@Injectable()
export class EmployeeService {

  async create(req: RequestWithUser, res: Response, createEmployeeDto: CreateEmployeeDto) {
    const { name, email, role } = createEmployeeDto
    const managerId = req.currentUser.id

    const AlreadyExist = await prisma.employee.findUnique({
      where: {
        email: email
      }
    })

    if (AlreadyExist) throw new BadRequestException("Employee Already Exist")
    const user = await prisma.employee.create({
      data: {
        name: name,
        email: email,
        role: role,
        managerId: managerId
      },
    });
    return res.json({ message: "Employee created", data: user })
  }

  async findAll(req: RequestWithUser, res: Response, role?: Role) {
    const managerId = req.currentUser.id
    if (role) {
      const rolledU = await prisma.employee.findMany({
        where: {
          role,
          managerId: managerId
        }
      })
      if (!rolledU) throw new BadRequestException("role not found")
      return res.json({ message: `Only ${role} fetched`, data: rolledU })
    };
    const AllU = await prisma.employee.findMany({
      where: {
        managerId: managerId
      }
    })
    return res.json({ message: "All User Fetched", data: AllU })
  }

  async findOne(req: RequestWithUser, res: Response, id: number) {
    const managerId = req.currentUser.id
    const UniqueU = await prisma.employee.findUnique({
      where: {
        id,
        managerId: managerId
      }
    });
    if (!UniqueU) throw new NotFoundException("Employee Not exist")
    return res.json({ message: `id ${id} user fetched`, data: UniqueU })
  }

  async update(req: RequestWithUser, res: Response, id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const managerId = req.currentUser.id
    const unique = await prisma.employee.findUnique({
      where: {
        id,
        managerId: managerId
      }
    })
    if (!unique) {
      throw new NotFoundException("Employee not exist")
    }
    const updateU = await prisma.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
    return res.json({ message: `user updated on ${id}`, data: updateU })
  }

  async remove(req: RequestWithUser, res: Response, id: number) {
    const managerId = req.currentUser.id
    const unique = await prisma.employee.findUnique({
      where: {
        id,
        managerId: managerId
      }
    })
    if (!unique) {
      throw new NotFoundException("Employee not exist")
    }
    const deleteU = await prisma.employee.delete({
      where: {
        id,
      }
    });
    return res.json({ message: ` user deleted on ${id}`, data: deleteU })
  }
}
