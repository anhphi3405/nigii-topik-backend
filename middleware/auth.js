const jwt = require('jsonwebtoken');

const auth = {
    verifyToken : async (req, res, next) => {
        const token = req.headers['token'];
        if(token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) =>{
                if(err) {
                    return res.status(403).json({message: "Token is not valid"});
                }
                req.user = user;
                next();
            })
        }     
        else{
            return res.status(401).json({message: "You are not authenticated"});
        }   
    }
}


module.exports = auth;