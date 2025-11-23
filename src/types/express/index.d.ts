import { Role } from "../modules/user/types/role.enum";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                role: Role;
                email?: string;
            };
        }
    }
}
