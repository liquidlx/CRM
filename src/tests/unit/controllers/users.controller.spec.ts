import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./../../../controllers"
import { PrismaService, UsersService } from "./../../../services";
import { id, mockAllUsersDBResponse, mockCreateUserData, mockUser, mockUserDBResponse, password, passwordEncrypted } from "./../mocks/users.mock";
import { hashPassword } from "./../../../../src/utils/password_hash";
import * as bcrypt from 'bcrypt';

describe('UsersController', () => {
    let controller: UserController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UsersService, PrismaService],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UsersService>(UsersService);
    });

    it('should delete a user and return nothing', async () => {
        jest
            .spyOn(service, 'delete')
            .mockImplementation(async () => mockUserDBResponse);

        const res = await controller.delete(id);

        expect(res).toStrictEqual(mockUser);
    });

    it('should try to delete a user that does not exist', async () => {
        jest
            .spyOn(service, 'delete')
            .mockImplementation(async () => null);

        const res = await controller.delete(id);

        expect(res).toStrictEqual(null);
    });

    it('should create a user', async () => {
        jest
            .spyOn(service, 'create')
            .mockImplementation(async () => mockUserDBResponse);

        const res = await controller.create(mockCreateUserData);

        expect(res).toStrictEqual(mockUser);
    });

    it('should update a user', async () => {
        jest.mock("../../../../src/utils/password_hash", () => jest.fn());
        jest
            .spyOn(service, 'update')
            .mockImplementation(async () => mockUserDBResponse);

        const res = await controller.update(id, mockCreateUserData);

        expect(res).toStrictEqual(mockUser);
    });

    it('should find user by id', async () => {
        jest
            .spyOn(service, 'findOne')
            .mockImplementation(async () => mockUserDBResponse);

        const res = await controller.find(id);

        expect(res).toStrictEqual(mockUser);
    });

    it('should not find user by id', async () => {
        jest
            .spyOn(service, 'findOne')
            .mockImplementation(async () => null);

        const res = await controller.find(id);

        expect(res).toStrictEqual(null);
    });

    it('should find all users', async () => {
        jest
            .spyOn(service, 'findAll')
            .mockImplementation(async () => mockAllUsersDBResponse);

        const res = await controller.findAll();

        expect(res).toStrictEqual(mockAllUsersDBResponse);
    });

    it('should try to find all users but none exist', async () => {
        jest
            .spyOn(service, 'findAll')
            .mockImplementation(async () => []);

        const res = await controller.findAll();

        expect(res).toStrictEqual([]);
    });

    it('should hash password', async () => {
        const res = await hashPassword(password);

        expect(await bcrypt.compare(res, passwordEncrypted)).toBeTruthy;
    });
})