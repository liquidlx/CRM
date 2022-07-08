import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const data = {
        name: 'Jhon Doe',
        email: 'jhondoe@test.com',
        password: await bcrypt.hash('password_example', 8),
    }

    await prisma.users.create({
        data
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });