import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {

        const { username, email, password,fname,lname, phoneNumber, location, avatar, bio, gender } = req.body;

        if (!username || !email || !password || !fname) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const exisitngUser = await User.findOne({ email });
        if (exisitngUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fname,
            lname,
            phoneNumber,
            location,
            avatar,
            bio,
            gender,
        }); await newUser.save();
        res.status(201).json({
            message: "User registered successfully",
            savedUser: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                fname: newUser.fname,
                lname: newUser.lname,
                phoneNumber: newUser.phoneNumber,
                location: newUser.location,
                avatar: newUser.avatar,
                bio: newUser.bio,
                gender:  newUser.gender,
            }
        })
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const loginUser = async (req,res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "Invalid email or password"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(404).json({message: "Invalid email or password"});
        }

        const payload ={
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"});

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                phoneNumber: user.phoneNumber,
                location: user.location,
                avatar: user.avatar,
                bio: user.bio,
                gender: user.gender,
                createdAt: user.createdAt,
            }});
    } catch (error) {
         console.error('Login Error:', error.message);
        res.status(500).json({ message: "Server Error" });
    }
}
