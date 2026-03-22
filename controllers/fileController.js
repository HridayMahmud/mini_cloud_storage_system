const { default: mongoose } = require('mongoose');
const File = require('../models/File')
const User = require('../models/User')

const uploadFile = async(req,res)=>{
    
    //assign session
    const session = await mongoose.startSession();


    try{
        //start session
        session.startTransaction();

        const {userId} = req.params;
        const {fileName,fileSize,fileHash} = req.body;

         //storage limit
        const STORAGE_LIMIT = 500;

        const user = await User.findById(userId).session(session);
        if(!user){
           return res.status(404).json({
                message:"user not found"
            });
        }
    
    //existing file
    const existingFile = await File.findOne({userId,fileName,deleted:false}).session(session);    
    if(existingFile){
    return res.status(400).json({
        message:"file already exists"
    });
}
    //file
    const files = await File.find({userId,deleted:false}).session(session);

    //convert filesize to number
    const fileSizeNum = Number(fileSize);

//storage limit check
    const currentStorage = files.reduce((sum,file)=> sum + file.fileSize,0);
   if(currentStorage + fileSizeNum > STORAGE_LIMIT){
    return res.status(400).json({
        
        message:"storage limit exceeded"
    });
}

    //upload file
const file = await File.create([
    {
    fileName,
    fileSize:fileSizeNum,
    fileHash,
    userId
}],{session});


//update storage
user.usedStorage = currentStorage + fileSize;
await user.save({session});

//if success then sesson commit
await session.commitTransaction();

res.status(200).json({
     user:user.name,
    message:"file uploaded successfully"
    
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
module.exports = uploadFile;

