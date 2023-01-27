import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role, Users } from '@prisma/client';
import { PatchUsersRequest, PostUsersRequest } from './../entities/requests';
import { UsersService } from './../services';
import { UserDto } from '../entities/dtos';
import { hashPassword } from '../utils/password-hash';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { generate } from 'generate-password';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService) {}

  @Get(':id')
  async find(@Param('id') id: string): Promise<UserDto | null> {
    const data = await this.usersService.findOne({ id });
    if (!data) return null;
    const { password, ...response } = data;
    return response;
  }

  @Get()
  async findAll(): Promise<UserDto[] | null> {
    return this.usersService.findAll({});
  }

  @Post()
  async create(@Body() {data}: PostUsersRequest): Promise<UserDto> {
    let { password, stores } = data;

    // Generate random password
    password = generate({
      length: 10,
      numbers: true
    });
    
    // Send password to user email.
    await this.mailerService
      .sendMail({
        to: data.email, // list of receivers
        from: 'leo@smartretention.com.br', // sender address
        subject: 'Seja bem-vindo(a) a Smart Retention', // Subject line
        text: `Olá, sua conta foi criado. Sua senha é esta: ${password}`, // plaintext body
        html: `<h1>Olá, sua conta foi criada</h1><br/><h2>Utilize esta senha para logar na plataforma: ${password}</h2>`, // HTML body content
      });


    // encrypt password
    data.password = await hashPassword(password);
    // CHANGE: This is default now. But the user should have an option to add new Admin users.
    data.role = Role.USER;

    const storesObj = stores.map(store => ({id: store}))


    return this.usersService.create({...data, stores: storesObj});
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<Users | null> {
    return this.usersService.delete({ id });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: PatchUsersRequest,
  ): Promise<UserDto | null> {
    // encrypt password
    if (body.password) {
      body.password = await hashPassword(body.password);
    }

    body.id = id;

    return this.usersService.update(body);
  }
}
