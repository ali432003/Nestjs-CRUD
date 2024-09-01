import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Req, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma, Role } from '@prisma/client';
import { CreateEmployeeDto } from 'src/dto/employee/employee-create.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/employee-update.dto';


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post('create')
  create(@Req() req, @Res() res, @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(req, res, createEmployeeDto);
  }

  @Get('get')
  findAll(@Req() req, @Res() res, @Query('role') role?: Role) {
    return this.employeeService.findAll(req, res, role);
  }

  @Get('get/:id')
  findOne(@Req() req, @Res() res, @Param('id') id: string) {
    return this.employeeService.findOne(req,res,+id);
  }

  @Patch('update/:id')
  update(@Req() req, @Res() res, @Param('id') id: string, @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(req,res,+id, updateEmployeeDto)
  }

  @Delete('delete/:id')
  remove(@Req() req, @Res() res, @Param('id') id: string) {
    return this.employeeService.remove(req,res,+id);
  }
}
