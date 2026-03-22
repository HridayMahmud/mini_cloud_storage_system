require('dotenv').config();
const mongoose = require('mongoose');


const DatabaseConnection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        
    }
    catch(error){
      console.log(error);
    }

}
module.exports = DatabaseConnection;