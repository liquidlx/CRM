import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PatchUsersRequest, PostUsersRequest } from "./../entities/requests/users.request";
import { UsersService } from "./../services";
import { UserDto } from "./../entities/dtos/UserDto";
import { hashPassword } from "./../utils/password_hash";

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':id')
    async find(@Param('id') id: string): Promise<UserDto | null> {
        return this.usersService.findOne({ id });
    }

    @Get()
    async findAll(): Promise<UserDto[] | null> {
        return this.usersService.findAll({})
    }

    @Post()
    async create(@Body() body: PostUsersRequest): Promise<UserDto> {
        // encrypt password
        body.password = await hashPassword(body.password);

        return this.usersService.create(body);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string): Promise<Users | null> {
        return this.usersService.delete({ id });
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: PatchUsersRequest): Promise<UserDto | null> {
        // encrypt password
        if (body.password) {
            body.password = await hashPassword(body.password);
        }

        body.id = id;

        return this.usersService.update(body);
    }
}