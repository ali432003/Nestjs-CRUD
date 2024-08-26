import { BadGatewayException, BadRequestException, Body, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { prisma } from '../../prisma/index';
import { CreateEmployeeDto } from 'src/dto/employee/employee-create.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/employee-update.dto';



@Injectable()
export class EmployeeService {

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { name, email, role } = createEmployeeDto

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
        role: role
      },
    });
    return { message: "created", data: user }
  }

  async findAll(role?: Role) {
    if (role) {
      const rolledU = await prisma.employee.findMany({
        where: {
          role,
        }
      })
      if (!rolledU) throw new BadRequestException("role not found")
      return { message: `Only ${role} fetched`, data: rolledU }
    };
    const AllU = await prisma.employee.findMany()
    return { message: "All User Fetched", data: AllU }
  }

  async findOne(id: number) {

    const UniqueU = await prisma.employee.findUnique({
      where: {
        id,
      }
    });
    if (!UniqueU) throw new NotFoundException("Employee Not exist")
    return { message: `id ${id} user fetched`, data: UniqueU }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const unique = await prisma.employee.findUnique({
      where: {
        id,
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
    return { message: `user updated on ${id}`, data: updateU }
  }

  async remove(id: number) {

    const unique = await prisma.employee.findUnique({
      where: {
        id,
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
    return { message: ` user deleted on ${id}`, data: deleteU }
  }
}
