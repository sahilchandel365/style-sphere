const mongoose= require('mongoose')
const Mongo_url=process.env.Mongo_conn;

mongoose.connect(Mongo_url)
.then(()=>{
    console.log("mogodb connected")

}).catch((err)=>{
    console.log("mogodb connection error",err);


    })