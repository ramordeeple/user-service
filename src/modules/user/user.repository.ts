export type UserRole = "admin" | "user"

export interface JwtUser {
    id: number
    role: UserRole
}