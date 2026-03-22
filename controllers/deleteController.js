
//delete controller

const { default: mongoose } = require("mongoose");
const File = require("../models/File");
const User = require("../models/User");

const deleteFile = async(req,res)=>{
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const {userId,fileId} = req.params;

        //check file
        const file = await File.findOne({
            _id:fileId,
            userId,
            deleted:false
        }).session(session);
    if(!file){
        await session.abortTransaction();
        return res.status(404).json({
            message:"file not found"
        });
    }

    //files
    const files = await File.find({userId,deleted:false}).session(session);

    //user access
    const user = await User.findById(userId).session(session);

    //update user and file
    // user.usedStorage -= file.fileSize;  // size will be reduced after deleting
     //file delation true
    file.deleted = true;

     //save file and user
    await file.save();

    const totalStorage = files.reduce((sum,file)=> sum +  file.fileSize,0);
    user.usedStorage = totalStorage;

    if (user.usedStorage < 0) user.usedStorage = 0; // prevent negative
   
    //save user
    await user.save();

    //commit transaction after success
    await session.commitTransaction();
    
    res.status(200).json({
        message:"file deleted successfully"
    });


    }catch(error){
        await session.abortTransaction();
        res.status(400).json({
            message:error.message
        })
    }
    finally{
        session.endSession();
    }

}

module.exports = deleteFile