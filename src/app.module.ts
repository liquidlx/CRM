import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { CompaniesController } from './controllers/companies.controller';
import { CustomersController } from './controllers/customers.controller';
import { StoresController } from './controllers/stores.controller';
import { UserController } from './controllers/users.controller';
import { CustomersService, PrismaService, UsersService } from './services';
import { AppService } from './services/app.service';
import { CompaniesService } from './services/companies.service';
import { StoresService } from './services/stores.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    CompaniesController,
    StoresController,
    CustomersController,
  ],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    CompaniesService,
    StoresService,
    CustomersService,
  ],
})
export class AppModule {}
