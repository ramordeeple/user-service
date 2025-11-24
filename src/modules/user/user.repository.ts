import {prisma} from "../../database/prisma"
import {User} from "@prisma/client"

export class UserRepository {
    create(data: any) {
        return prisma.user.create({data})
    }

    findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } })
    }

    findById(id: number) {
        return prisma.user.findUnique({ where: { id } })
    }

    findAll() {
        return prisma.user.findMany()
    }

    blockUser(id: number) {
        return prisma.user.update({
            where: { id },
            data: {isActive: false}})
    }

    update(id: number, data: Partial<User>) {
        return prisma.user.update({
            where: { id },
            data,
        })
    }

}