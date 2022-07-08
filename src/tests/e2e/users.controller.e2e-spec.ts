import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../src/app.module";
import { email, id, mockCreateUserData, mockUserHTTPResponse, name, password, passwordEncrypted } from '../unit/mocks/users.mock';
import { PrismaService, UsersService } from '../../../src/services';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
            providers: [UsersService, PrismaService],
        }).compile();

        app = moduleFixture.createNestApplication();
        prisma = new PrismaService();

        await app.init();

        //erase database
        prisma.$executeRaw('TRUNCATE TABLE users RESTART IDENTITY CASCADE;' as any);
    });

    it('should create user via POST', async () => {
        const response = await request(app.getHttpServer())
            .post(`/users/`)
            .send(mockCreateUserData);

        expect(response.status).toEqual(201);
        expect(response.body.id).toEqual(id);
        expect(response.body.name).toEqual(name);
        expect(response.body.email).toEqual(email);
    });

    it('should update user via POST', async () => {
        const response = await request(app.getHttpServer())
            .patch(`/users/${id}`)
            .send(mockCreateUserData);

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(id);
        expect(response.body.name).toEqual(name);
        expect(response.body.email).toEqual(email);
    });

    it('should GET user by id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/users/${id}`);

        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(id);
        expect(response.body.name).toEqual(name);
        expect(response.body.email).toEqual(email);
    });

    it('should GET all users', async () => {
        const response = await request(app.getHttpServer())
            .get('/users/');

        expect(response.status).toEqual(200);
    });

    it('should DELETE user by id', () => {
        return request(app.getHttpServer())
            .delete(`/users/${id}`)
            .expect(204)
    });
});