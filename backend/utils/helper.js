//file to generate jwt token

import jwt from "jsonwebtoken";

export function generateToken(payload){
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
}