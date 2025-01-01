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
    }
}


module.exports = userController;