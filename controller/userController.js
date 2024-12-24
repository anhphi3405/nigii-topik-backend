const Users = require('../model/userModel');

const userController = {
    createUser: async (req, res) => {
        const { username, email, password } = req.body;
        console.log(req.body);
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
                name: username,
                email: email,
                password: password
            });
            await user.save();

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;