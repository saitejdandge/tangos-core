import * as jwt from "jsonwebtoken"
export function getJWTToken(secret:string,userId:string){
    const token = jwt.sign({id: userId, isActive: true}, secret, {
        expiresIn: 86400 // expires in 24 hours
    });
}