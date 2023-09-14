let mongoose= require('mongoose');
require('dotenv').config();
const path = require('path');
let SubcategorySchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
        minlength:[4,'category name is too short least 4'],
        maxlength:[26,'category name is too long'],
        trim:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
},{timestamps:true});

SubcategorySchema.post("init",function(doc){
    if(doc.image){
        doc.image=`${process.env.base_url}/subcategory/${doc.image}`;
    };
})

SubcategorySchema.pre(/^find/ig,function(next){
    this.populate({path:"category",select:"name"});
    next();
})
let subcategoryModel=mongoose.model('Subcategory',SubcategorySchema);
module.exports=subcategoryModel;