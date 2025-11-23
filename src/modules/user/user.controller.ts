import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Role } from "../../types/role.enum";
import { UserService } from "./user.service";

export class UserController {
    private service = new UserService();

    register = async (req: Request, res: Response) => {
        const user = await this.service.register(req.body);
        res.status(StatusCodes.CREATED).json(user);
    };

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const result = await this.service.login(email, password);
        res.json(result);
    };

    getById = async (req: Request, res: Response) => {
        if (!req.user)
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });

        const id = Number(req.params.id);

        if (req.user.role !== Role.ADMIN && req.user.id !== id)
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });


        const user = await this.service.getById(id);
        res.json(user);
    };

    getAll = async (req: Request, res: Response) => {
        if (!req.user || req.user.role !== Role.ADMIN)
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });


        const users = await this.service.getAll();
        res.json(users);
    };

    block = async (req: Request, res: Response) => {
        if (!req.user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });

        const id = Number(req.params.id);

        if (req.user.role !== Role.ADMIN && req.user.id !== id)
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });


        const result = await this.service.block(id);
        res.json(result);
    };
}
