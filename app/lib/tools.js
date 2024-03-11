import jwt from "jsonwebtoken";
export const verifyToken=(token)=>{
    const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
    const decodedToken = jwt.decode(token);
    if (decodedToken.publicKey === JWT_SECRET){
        return true;
    }
    else return false;

}