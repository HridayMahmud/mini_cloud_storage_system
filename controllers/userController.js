const User = require("../models/User");

const createUser = async(req,res)=>{
    const {name} = req.body;

    try{
        const user =  new User({name});
        await user.save();
        res.status(200).json({
            message:"user created successfully"
        });
    }
    catch(error){
          console.log(error.message); 
        res.status(400).json({
            message:error.message
        });
    }
}
module.exports = createUser;