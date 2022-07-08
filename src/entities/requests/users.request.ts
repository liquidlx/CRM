import { IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class UsersAttributes {
    @IsOptional()
    @IsUUID(4)
    id?: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class PostUsersRequest extends UsersAttributes {
}

export class PatchUsersRequest extends UsersAttributes {
}