import { Request, Response } from "express";
import { UserService } from "./user.service";
import { checkAdminOrSelf, forbidden } from "../../utils/access";
import {StatusCodes} from "http-status-codes";
import {Role} from "../../types/role.enum";

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

    block = async (req: Request, res: Response) => {
        if (!req.user) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });

        const id = Number(req.params.id);

        if (req.user?.role !== Role.ADMIN && req.user.id !== id) return forbidden(res);

        const result = await this.service.block(id);
        res.json(result);
    };

    unblock = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (!checkAdminOrSelf(req, id)) return forbidden(res);

        const result = await this.service.unblock(id);
        res.json(result);
    };

    getById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (!checkAdminOrSelf(req, id)) return forbidden(res);

        const user = await this.service.getById(id);
        res.json(user);
    };

    getAll = async (req: Request, res: Response) => {
        if (req.user?.role !== Role.ADMIN) return forbidden(res);

        const users = await this.service.getAll();
        res.json(users);
    };
}
