// authentication and authorization middleware

import jwt from "jsonwebtoken";

// middleware for authentication of the token
export function authenticateToken(req,res,next){
    // get the token from Authorization bearer token from the request header
    const token = req.headers["authorization"]?.split(" ")[1];

    if(!token){
        return res.status(403).json({message:"No token provided"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // set the user object in the request
        req.user = decoded;
        console.log("Authenticated user: ",req.user);
        // pass the request to the next middleware
        next();
    }catch(error){
        // if the token is invalid
        return res.status(401).json({message:"Invalid token"});
    }
}

// middleware for authorization of the user
export function isAdmin(req,res,next){
    const{role} = req.user;

    if(role !== "admin"){
        return res.status(403).json({message:"You are not authorized to perform this action"});    
    }
    next();
}