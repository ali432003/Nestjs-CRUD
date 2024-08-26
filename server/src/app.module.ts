import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [EmployeeModule, ThrottlerModule.forRoot([
    {
      ttl: 60000,
      limit: 3   //iska mtlb specific client se 1sec me 3 zyada request nhi aaskti
    }
  ])],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],  //yhn se mera throttler globally initialized hogya
})
export class AppModule { }
