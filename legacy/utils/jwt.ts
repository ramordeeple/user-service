import jwt from "jsonwebtoken"

export const signJWT = (data: any)=>
    jwt.sign(data, process.env.JWT_SECRET!, {expiresIn: '1h'})
