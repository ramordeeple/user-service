import prisma from "../database/prisma";

export class UserRepository {
    create(data) {
        return prisma.user.create({data})
    }

    findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } })
    }

    findById(id: number) {
        return prisma.user.findUnique({ where: { id } })
    }

    findAll() {
        return prisma.user.findAll()
    }

    blockUser(id: number) {
        return prisma.user.update({
            where: { id },
            data: {isActive: false}})
    }
}