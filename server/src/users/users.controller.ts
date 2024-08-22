// isme bhai sarey routes(endpoints) ayenge har route /users se bnega or har route jo bnega wo method name se bnega 

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createuser-dto';
import { UpdateUserDto } from './dto/updateUser-dto';


@Controller('users')
export class UsersController {
    /*
        @GET()  /users
        @POST() /users
        @PATCH() /users/:id
        @DELETE() /users/:id
    */
    constructor(private readonly userServices: UsersService) { }   // this is for injecting the services into these controller

    @Get()
    findAll(@Query('role') role?: "Moderator" | "Admin" | "User") {
        return this.userServices.findAll(role)  //hit that request http://localhost:3000/users or http://localhost:3000/users?role='INTERN' | 'ADMIN' | 'ENGINEER' with GET
    }

    @Post()      // http://localhost:3000/users  with metod POST
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userServices.create(createUserDto)
    }

    @Patch(':id')    // /user/:id  usage of params but if we create another route beneath of it , they replace this :id
    findByIdAndUpdate(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.userServices.findByIdAndUpdate(id, updateUserDto)
    }

    @Delete(':id')   //   /user/:id
    findByIdAndDelete(@Param('id', ParseIntPipe) id: number) {   //here parseIntPipe act as a middleware changing id(string) to number
        return this.userServices.findByIdAndDelete(id)
    }
}
