import { MailerModule } from '@nestjs-modules/mailer';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { CompaniesController } from './controllers/companies.controller';
import { CustomersController } from './controllers/customers.controller';
import { SalesController } from './controllers/sales.controller';
import { SellersConstroller } from './controllers/sellers.controller';
import { StoresController } from './controllers/stores.controller';
import { UserController } from './controllers/users.controller';
import {
  AuthService,
  CustomersService,
  PrismaService,
  SellersService,
  UsersService,
} from './services';
import { AppService } from './services/app.service';
import { CompaniesService } from './services/companies.service';
import { SalesService } from './services/sales.service';
import { StoresService } from './services/stores.service';
import { JwtStrategy } from './strategies';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    CacheModule.register(),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1200s',
      },
    }),
    MailerModule.forRoot({
      transport: 'smtps://leo@smartretention.com.br:Smart@2022@smtp.titan.email',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        options: {
          strict: true,
        },
      },
    }),

  ],
  controllers: [
    AppController,
    UserController,
    CompaniesController,
    StoresController,
    CustomersController,
    SellersConstroller,
    SalesController,
    AuthController,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
    PrismaService,
    UsersService,
    CompaniesService,
    StoresService,
    CustomersService,
    SellersService,
    SalesService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
