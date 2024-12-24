const categoryModel = require('../models/categoryModel');
const categoryController ={
    getFlag : async (req, res) =>{
        try{
            const categories = await categoryModel.find();
        }
        catch(error){
            res.status(500).json({message: error.message});
        }
    },
    changeFlag :  async (req, res) => {
        const {id, newFlag} = req.body;
        try{
            const updatedCategory = await categoryModel.findByIdAndUpdate(id, {flag: newFlag}, {new: true});   
            if(!updatedCategory){
                return res.status(404).json({message: 'Category not found'});
            }
            res.status(200).json(updatedCategory);
        }
        catch(error){
            res.status(500).json({message: error.message});
        }

    }
}

module.exports = categoryController;
