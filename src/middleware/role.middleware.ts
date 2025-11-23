import {Request, Response, NextFunction} from "express";
import {Role} from "../types/role.enum";
import {StatusCodes} from "http-status-codes";

export const roleMiddleware = (role: Role) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({message: "Unauthorized"})
        }

        if (req.user.role !== role) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({message: "Forbidden"})
        }

        next()
    }


}