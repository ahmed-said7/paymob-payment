let mongoose= require('mongoose');
require('dotenv').config();

let categorySchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:4,
        trim:true,
    },
    image:String
},{timestamps:true});

categorySchema.post("init",function(doc){
        if(doc.image){
            doc.image=`${process.env.base_url}/category/${doc.image}`;
        };
})
const categoryModel=mongoose.model('Category',categorySchema);
module.exports=categoryModel;