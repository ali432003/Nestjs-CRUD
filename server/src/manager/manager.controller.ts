import { Body, Controller, Get, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDTO } from 'src/dto/manageer/manager-create.dto';
import { loginManagerDTO } from 'src/dto/manageer/manager-login.dto';


@Controller('manager/auth')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) { }

  @Post('signup')
  signup(@Req() req, @Res() res, @Body(ValidationPipe) CreateManagerDTO: CreateManagerDTO) {
    return this.managerService.signup(req, res, CreateManagerDTO)
  }

  @Post('login')
  login(@Req() req, @Res() res, @Body(ValidationPipe) LoginManagerDTO: loginManagerDTO) {
    return this.managerService.login(req, res, LoginManagerDTO)
  }

  @Post('logout')
  logout(@Req() req, @Res() res) {
    return this.managerService.logout(req, res)
  }

  @Get('profile')
  profile(@Req() req, @Res() res) { 
    return this.managerService.profile(req,res)
  }
}
