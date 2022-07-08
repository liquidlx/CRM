import { UsersService } from "../../../services";
import { prismaMock } from "../mocks/prisma-singleton.mock";
import { id, mockUserExpected, mockCreateUserData, mockUserDBResponse, mockAllUsersDBResponse } from "../mocks/users.mock";

describe('UserService', () => {
    let service: UsersService;

    beforeEach(async () => {
        service = new UsersService(prismaMock as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a user', async () => {
        prismaMock.users.create.mockResolvedValue(mockUserDBResponse);

        const res = await service.create(mockCreateUserData);

        expect(res).toStrictEqual(mockUserExpected);
    });

    it('should update a user', async () => {
        prismaMock.users.update.mockResolvedValue(mockUserDBResponse);

        const res = await service.update(mockCreateUserData);

        expect(res).toStrictEqual(mockUserExpected);
    });

    it('should delete a user', async () => {
        prismaMock.users.delete.mockResolvedValue(mockUserDBResponse);

        const res = await service.delete({ id });

        expect(res).toStrictEqual(mockUserExpected);
    });

    it('should find user by id', async () => {
        prismaMock.users.findUnique.mockResolvedValue(mockUserDBResponse);

        const res = await service.findOne({ id });

        expect(res).toStrictEqual(mockUserExpected);
    });

    it('should not find user by id', async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);

        const res = await service.findOne({ id });

        expect(res).toStrictEqual(null);
    });

    it('should find all users', async () => {
        prismaMock.users.findMany.mockResolvedValue(mockAllUsersDBResponse);

        const res = await service.findAll({});

        expect(res).toStrictEqual(mockAllUsersDBResponse);
    });

    it('should not find all users', async () => {
        prismaMock.users.findMany.mockResolvedValue([]);

        const res = await service.findAll({});

        expect(res).toStrictEqual([]);
    });
})