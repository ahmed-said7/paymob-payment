let mongoose= require('mongoose');
require('dotenv').config();
const databaseConnect=()=>{
    mongoose.connect(process.env.url).then(()=>{
        console.log('connection established')
    }).catch((err)=>{console.log(err);});
};
databaseConnect()
module.exports=databaseConnect;