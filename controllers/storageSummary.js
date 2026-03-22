//storage summary

const { default: mongoose } = require("mongoose");
const File = require("../models/File");
const User = require("../models/User");

const storageSummary = async(req,res)=>{
const session = await mongoose.startSession();

  try{
    session.startTransaction();
    const {userId} = req.params;
    //find user
    const user = await User.findById(userId).session(session);

    //check user
    if(!user){
        await session.abortTransaction();
        return res.status(400).json({
            message:"user not found"
        });
    }

    const totalFiles = await File.countDocuments({
        userId,
        deleted:false
    });

    const files = await File.find({
        userId,
        deleted:false
    });
    const usedStorage = files.reduce((sum,file)=> sum + file.fileSize, 0);
    await session.commitTransaction();
    res.status(200).json({
        user:user.name,
        usedStorage: usedStorage+"mb",
        remainingStorage: 500 - usedStorage+"mb",
        totalFiles:totalFiles,
        
    })

  }
  catch(error){
    await session.abortTransaction();
    res.status(400).json({
        message:error.message
    })
  }
  finally{
    session.endSession();
  }

}
module.exports = storageSummary