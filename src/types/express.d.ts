import {Role} from "./role.enum";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number,
                role: Role
            }
        }
    }
}