import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { Role } from "../types/role.enum"
import { StatusCodes } from "http-status-codes"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token" })

    const token = authHeader.split(" ")[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number
            role: Role
            email: string
        }

        req.user = {
            id: payload.id,
            role: payload.role,
            email: payload.email,
        }

        next()
    } catch {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" })
    }
}
