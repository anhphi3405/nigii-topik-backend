const bcrypt = require('bcrypt');
const Users = require('../model/userModel');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendmail');
const axios = require('axios');
let refreshTokens = [];
const authController = {
    registerUser: async (req, res) => {
        const { username, email, password, role } = req.body;
        console.log(req.body);
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log(hashedPassword);
            const newUser = new Users({
                username: username,
                email: email,
                password: hashedPassword,
                role : role
            });

            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    registerByEmail : async (req, res) => {
        const {email, code} = req.body;
        const createClient = require('redis').createClient;
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        const time = Date.now();
        await client.set('code', code);
        await client.set('time', time);
        await client.set('email', email);
        const subject = 'Your Verification Code';
        const html = `000
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h2>Verification Code</h2>
                <p>Thank you for signing up! Your verification code is:</p>
                <p style="font-size: 24px; font-weight: bold;">${code}</p>
                <p>Please enter this code to verify your email address.</p>
                <br>
                <p>If you did not request this code, please ignore this email.</p>
            </div>
        `;
        const text = `Thank you for signing up! Your verification code is: ${code}. Please enter this code to verify your email address. If you did not request this code, please ignore this email.`;
        sendMail(req.body.email, subject, text, html);
    },
    generateAccessToken:  (user) => {
        const generatedToken = jwt.sign(
            {
                id : user.id,
                role : user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: '30d'},
        );
        return generatedToken;
    },

    generateRefreshToken:  (user) => {
        return jwt.sign(
            {
                id : user.id,
                role : user.role
            },
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '365d'},
        )
    },

    loginUser: async (req, res) =>{
        const {username, password} = req.body;
        try{
            const user = await Users.findOne({username: username});
            if(!user) return res.status(400).json({message: "User not found"});
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword) return res.status(400).json({message: "Invalid password"});
            if(user && validPassword){
                const accessToken =  authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure : false,
                    path : "/",
                    sameSite: "strict",
                });
                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
            }
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },

    requestRefreshToken: async (req,res) =>{
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(400).json({message: "User not authenticated"});
        if(!refreshTokens.includes(refreshToken)) {
            return res.status(400).json({message: "Refresh token is  not valid"});
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err,user) =>{
            if(err) {
                console.log(err);
            }
            else{
                refreshTokens = refreshTokens.filter(token => token !== refreshToken);
                const newAccessToken = authController.generateAccessToken(user);
                const newRefreshToken = authController.generateRefreshToken(user);
                refreshToken.push(newRefreshToken);
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure : false,
                    path : "/",
                    sameSite: "strict",
                });
                res.status(200).json(...user, newAccessToken);
            }
        })
    },
    userLogout: async (req,res) =>{
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json({message: "User logged out"});
    }
    ,
    checkCode : async (req,res) =>{
        const createClient = require('redis').createClient;
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        const {code} = req.body;
        const time = await client.get('time');
        if(Date.now() - time > 600000){
            res.status(400).json({message: "Time out"});
        }
        const savedCode = await client.get('code');
        if(code === savedCode){
            res.status(200).json({message: "Code is correct"});
            const email = await client.get('email');
            await client.del('code');
            await client.del('time');
            const name = email.split('@')[0];
            const newUser = new Users({username : name, email});
            await newUser.save();
        }
        else{
            res.status(400).json({message: "Code is incorrect"});
        }
    },
    loginByEmail : async (req,res) =>{
        const {email} = req.body;
        const code = Math.floor(100000 + Math.random() * 900000);
        const createClient = require('redis').createClient;
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        const time = Date.now();
        await client.set('code', code);
        await client.set('time', time);
        await client.set('email', email);
        const subject = 'Your Verification Code';
        const html = `000
            <div style="font-family: Arial, sans-serif; text-align: center;">
                <h2>Verification Code</h2>
                <p>Thank you for signing up! Your verification code is:</p>
                <p style="font-size: 24px; font-weight: bold;">${code}</p>
                <p>Please enter this code to verify your email address.</p>
                <br>
                <p>If you did not request this code, please ignore this email.</p>
            </div>
        `;
        const text = `Thank you for signing up! Your verification code is: ${code}. Please enter this code to verify your email address. If you did not request this code, please ignore this email.`;
        sendMail(req.body.email, subject, text, html);
        res.status(200).json({message: "Code has been sent to your email"});
    },
    checkLoginCode : async (req,res) =>{
        const createClient = require('redis').createClient;
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        const {code} = req.body;
        const time = await client.get('time');
        if(Date.now() - time > 600000){
            res.status(400).json({message: "Time out"});
        }
        const savedCode = await client.get('code');
        if(code === savedCode){
            const email = await client.get('email');
            const user = await Users.findOne({email});
            if(!user){
                res.status(400).json({message: "User not found"});
            }
            const accessToken =  authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure : false,
                path : "/",
                sameSite: "strict",
            });
            const {password, ...others} = user._doc;    
            res.status(200).json({...others, accessToken});
        }
        else{
            res.status(400).json({message: "Code is incorrect"});
        }
    }
}



module.exports = authController;