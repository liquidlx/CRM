import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { CompaniesController } from './controllers/companies.controller';
import { UserController } from './controllers/users.controller';
import { PrismaService, UsersService } from './services';
import { AppService } from './services/app.service';
import { CompaniesService } from './services/companies.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, CompaniesController],
  providers: [AppService, PrismaService, UsersService, CompaniesService],
})
export class AppModule { }
