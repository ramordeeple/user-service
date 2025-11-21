export interface RegisterDTO {
    name: string
    birthDate: string
    email: string
    password: string
}

export interface LoginDTO {
    email: string
    password: string
}