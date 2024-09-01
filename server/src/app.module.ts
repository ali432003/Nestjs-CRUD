import { Module, NestMiddleware, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import { AuthMiddleware } from './middleware/auth.middleware';



@Module({
  imports: [EmployeeModule, ManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/employee/create', '/employee/get', '/employee/get/:id','/employee/update/:id','/employee/delete/:id','/manager/auth/logout','/manager/auth/profile');
  }

}