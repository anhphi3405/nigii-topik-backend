const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const checkAdmin = (req, res, next) => {
    auth.verifyToken(req,res,()=>{
        if(req.user.role === 'admin'){
            console.log("This is an admin");
            next();
        }else{
            res.status(403).json({message: "You are not authorized"});
        }
    })
}


module.exports = checkAdmin;

