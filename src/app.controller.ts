import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './public-route';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Public()
  @Get()
  sayHello() {
    return this.appService.getHello();
  }
}
