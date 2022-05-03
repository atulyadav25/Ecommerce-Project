const app = require('./App')
const cloudinary = require('cloudinary')
const connectDatabase = require("./database") //Importing Mongo DB Database Connection Link


//Uncaught Errors : -- Used when something is not defined is used in code
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the Server due to Uncaught Exception`)
    process.exit(1)

})



//Config
if (process.env.NODE_ENV!=="PRODUCTION") {
    
    require('dotenv').config({path: "backend/config/config.env"})
}

//Calling Data Base  ---! Important Database called only after dotenv *Synchronous Functions*
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})




const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

//Unhandled Promise Rejection : -- Used when no connection or any problem with database connection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the Server due to unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1)
    });
})