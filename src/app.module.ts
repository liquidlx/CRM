import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/users.controller';
import { PrismaService, UsersService } from './services';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule { }
