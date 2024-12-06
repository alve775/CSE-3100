import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";


const register = TryCatch(async(req, res) => {

    const {email, name, password} = req.body;
        let user = await User.findOne({email});

        if(user) 
            return res.status(400).json({
                message: "User already exists",
            });

        const hashPass = await bcrypt.hash(password, 10);
        user = {
            name, 
            email,
            password: hashPass
        }

        const otp = Math.floor(Math.random() * 1000000);

        const activationToken =  jwt.sign({
            user,
            otp
        }, process.env.Activation_secret, 
        {
            expiresIn: '5m'
        });

        const data = {
            name, 
            otp,
        };

        await sendMail(
            email,
            "E-Learning",
            data
        )
        res.status(200).json({
            message: "OTP sent to your email",
            activationToken
        })
});

export const verifyUser = TryCatch(async(req, res) => {
    const {otp, activationToken} = req.body;
    const verify = jwt.verify(activationToken, process.env.Activation_secret);
    if(!verify) {
        return res.status(400).json({
           message: "OTP expired" ,
        });
    }
    /* console.log(activationToken);
    
    console.log(verify.otp);
    console.log(otp); */
    
    if(verify.otp !== otp) {
        return res.status(400).json({
            message: "Invalid OTP",
        });
    }
    await User.create({
        name: verify.user.name, 
        email: verify.user.email,
        password: verify.user.password 
    })
    res.json({
        message: "User registered successfully",    
    })
});

export const alluser = async(req ,res) => {
    try {

        const users = await User.find({})
        res.status(200).json(users)
        
    } catch (error) {
        console.log("Cannot fetch users");
        
    }
}

export const loginUser = TryCatch(async(req, res) => {
    const{email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({
            message: "No User with this email"
        });
    }
    const mathPassword = await bcrypt.compare(password, user.password);

    /* console.log(password);
    console.log(email); */

    if(!mathPassword) {
        return res.status(400).json({
        message: "Wrong password"
        });
    }

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
        expiresIn: "15d"
    });
    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user
    });
});

export const myProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.user._id);

    res.json({user});   
});

export default register;