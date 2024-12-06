import jwt from "jsonwebtoken";
import { User } from '../models/user.js';


export const isAuth = async(req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token)
            return res.status(403).json({
            message: "Please Login",
      });
        const decodedData = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = await User.findById(decodedData._id);
        next();

    } catch (error) {
        res.status(500).json({
            message: "Login first"
        });
    }
};

export const isAdmin = async(req, res, next) => {
    try {
        if(req.user.role !== "admin") {
            return res.status(403).json({
                message: "You are not an admin"
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message
        });       
    }
};