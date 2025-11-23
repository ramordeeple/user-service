import {UserRepository} from "./user.repository";
import {ApiError} from "../../errors/ApiError";
import {comparePassword, hashPassword} from "../../utils/crypto";
import {StatusCodes} from "http-status-codes";
import {Role} from "../../types/role.enum";
import {signJWT} from "../../utils/jwt";

export class UserService {
    private repo = new UserRepository()

    async register(data: any) {
        const exists = await this.repo.findByEmail(data.email)
        if (exists)
            throw new ApiError(StatusCodes.CONFLICT, `Email already exists`)

        const hashed = await hashPassword(data.password)

        // чтобы можно было передавать удобно дату
        const birthDate = data.birthDate ? new Date(data.birthDate) : null

        return this.repo.create({
            ...data,
            birthDate,
            password: hashed,
            role: Role.USER,
            isActive: true
        })
    }


    async login(email: string, password: string) {
        const user = await this.repo.findByEmail(email)
        if (!user)
            throw new ApiError(StatusCodes.BAD_REQUEST, `Invalid credentials`)

        const valid = await comparePassword(password, user.password)
        if (!valid)
            throw new ApiError(StatusCodes.BAD_REQUEST, `Invalid credentials`)

        const token = signJWT({
            id: user.id,
            role: user.role as Role,
        })

        return {token}
    }

    async getById(id: number) {
        const user = await this.repo.findById(id)
        if (!user)
            throw new ApiError(StatusCodes.NOT_FOUND, `User not found`)

        return user
    }

    async getAll() {
        return this.repo.findAll()
    }

    async block(id: number) {
        const user = await this.repo.findById(id)
        if (!user)
            throw new ApiError(StatusCodes.NOT_FOUND, `User not found`)

        if (!user.isActive)
            throw new ApiError(StatusCodes.BAD_REQUEST, `User already blocked`)

        return this.repo.blockUser(id)
    }
}