const mongoose = require('mongoose');
const User = require('../models/User')

const fileSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    fileSize:{
        type:Number,
        required:true
    },
    fileHash:String,
    uploadTime:{
        type: Date,
        default: Date.now
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
     
    },
    deleted:{
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model("File",fileSchema);