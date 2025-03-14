const Users = require('../model/userModel');
const userController = {
    getAllUsers : async (req, res) => {
        try{
            const users = await Users.find();
            res.status(200).json(users);
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },
    deleteUser: async (req, res) =>{
        const id = req.params.id;
        try{
            const user = await Users.findByIdAndDelete(id);
            res.status(200).json({message: "User deleted"});
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },
    createUser : async (req, res) =>{
        const {username, email, password, avatar, role} = req.body;
        const newUser = new Users({username, email, password, avatar, role});
        try{
            await newUser.save();
            res.status(201).json(newUser);
        }
        catch(error){
            res.status(400).json({message: error.message});
        }
    },
    updateUser : async (req, res) =>{
        const id = req.params.id;
        const {username, email, password, avatar, role} = req.body;
        try {
            const user =  await Users.findByIdAndUpdate(id, {username, email, password, avatar, role});
            user.save();
            res.status(200).json(user);
        }
        catch(error){
            console.log("failed to update user");
            res.status(400).json({message: error.message});
        }
    }
}
module.exports = userController;