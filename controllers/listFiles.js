//list files

const { default: mongoose } = require("mongoose");
const File = require("../models/File");
const User = require("../models/User");


const listFiles = async(req,res)=>{
    const session = await mongoose.startSession();

    try{
        session.startTransaction();
        const {userId} = req.params;
        const user = await User.findById(userId);

        const files = await File.find({
            userId,
            deleted:false
        }).select("fileName fileSize uploadTime");
        await session.commitTransaction();
        res.status(200).json({
            user:user.name,
            totalfiles:files.length,
            allfiles: files
        });
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
module.exports = listFiles