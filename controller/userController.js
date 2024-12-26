const Users = require('../model/userModel');

const userController = {
    createUser: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const existingUsers = await Users.find();
            const isUserEmailExist = existingUsers.find(user => user.email === email);
            const isUserNameExist = existingUsers.find(user => user.name === username);
            if (isUserEmailExist) {
                return res.status(401).json({ message: 'Email already exists' });
            }
            if (isUserNameExist) {
                return res.status(402).json({ message: 'Username already exists' });
            }
            const user = new Users({ 
                username,
                email,
                password
            });
            await user.save();

            res.status(201);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    postCheckUser: async (req,res) =>{
        const {userName, password} = req.body;
        try{
            const userHavePassword = await Users.findOne({password: password});
            const userHaveUsername = await Users.findOne({username: userName});
            if(userHavePassword!=null && userHaveUsername!=null && userHavePassword.id === userHaveUsername.id){
                await Users.updateOne({username: userName}, {isLoggedIn: true});
                res.status(200).json({message: 'login success'})
            }
            else{
                res.status(401).json({message: 'login fail'});
            }
        }
        catch(error){
            res.status(500).json({message: error.message});
        }   
    },
    getUser: async (req, res) => {
        const username = req.params.username;
        try {
            const user = await Users.findOne({ username });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;