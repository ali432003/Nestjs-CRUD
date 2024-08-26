import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma, Role } from '@prisma/client';
import { CreateEmployeeDto } from 'src/dto/employee/employee-create.dto';
import { UpdateEmployeeDto } from 'src/dto/employee/employee-update.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post('create')
  create(@Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('get')
  findAll(@Query('role') role?: Role) {
    return this.employeeService.findAll(role);
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto ) {
    return this.employeeService.update(+id, updateEmployeeDto)
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
