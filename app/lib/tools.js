import jwt from "jsonwebtoken";
import {deleteCookie} from "cookies-next";
export const verifyToken= (token) => {
    let verified=false;
    if (token){
        const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
        const decodedToken = jwt.decode(token);

        if (decodedToken?.publicKey === JWT_SECRET && Date.now() <= decodedToken.exp * 1000) {
            console.log("verified")
             verified=true
            return verified
        }
        else {
            console.log("Not verified")
            deleteCookie('user')
            return verified
        }
    }
    return verified
}
