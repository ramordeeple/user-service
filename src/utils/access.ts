import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { Role } from "../types/role.enum"

export const checkAdminOrSelf = (req: Request, id: number): boolean => {
    return req.user?.role === Role.ADMIN || req.user?.id === id
}

export const forbidden = (res: Response) => {
    res.status(StatusCodes.FORBIDDEN).json({message: "Forbidden"})
}

export const unauthorized = (res: Response) => {
    res.status(StatusCodes.UNAUTHORIZED).json({message: "Unauthorized"})
}