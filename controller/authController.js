const bcrypt = require('bcrypt');
const Users = require('../model/userModel');
const jwt = require('jsonwebtoken');
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
                res.status(200).json({accessToken: newAccessToken});
            }
        })
    },
    userLogout: async (req,res) =>{
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json({message: "User logged out"});
    }
}



module.exports = authController;