import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Object {
    return { message: 'Welcome To NESTjs CRUD Practice' };
  }
}
