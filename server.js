require('dotenv').config();
const express = require('express');
const DatabaseConnection = require('./config/database');
const router = require('./routes/fileRoutes');



//app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/users",router);


// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});



const startDatabase = async ()=>{
    try{
        await DatabaseConnection();
        console.log('database connected successfully');
        const PORT = process.env.PORT || 4000;

        //app listening 
        app.listen(PORT,()=>{
            console.log(`server is running at http://localhost:${PORT}`);
        })


    }catch(error){
        console.log('connection failed',error);
    }

}
startDatabase();