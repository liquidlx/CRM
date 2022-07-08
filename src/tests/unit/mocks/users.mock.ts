import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/entities/dtos/UserDto';

export const idList = [
    '2fe037a7-d70c-4fb3-b94f-318b138cf5c6',
    '3ab13737-d70c-4fb3-b94f-318b138cff10'
]
export const id = '2fe037a7-d70c-4fb3-b94f-318b138cf5c6';
export const name = 'John Doe';
export const email = 'johndoe@test.com';
export const password = 'password_test';
export const passwordEncrypted = '$2a$08$V4hmDON/rzhN5wc56xWg0OWsONW9lBedEGzddTbaeU.xmOEGIKRBK';
export const updatedAt = new Date();
export const createdAt = new Date();

export const mockUser: Users = {
    id,
    name,
    email,
    password: passwordEncrypted,
    updatedAt,
    createdAt
}

export const mockUserHTTPResponse: UserDto = {
    id,
    name,
    email,
    updatedAt,
    createdAt
}

export const mockCreateUserData = {
    id,
    name,
    email,
    password,
}

export const mockUserExpected = {
    id,
    name,
    email,
    password: passwordEncrypted,
    updatedAt,
    createdAt
}

export const mockUserDBResponse = {
    id,
    name,
    email,
    password: passwordEncrypted,
    updatedAt,
    createdAt
}

export const mockAllUsersDBResponse = [
    {
        id: idList[0],
        name,
        email,
        password: passwordEncrypted,
        updatedAt,
        createdAt
    },
    {
        id: idList[1],
        name,
        email,
        password: passwordEncrypted,
        updatedAt,
        createdAt
    }
]