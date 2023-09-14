let Subcategory=require('../models/subcategoryModel')
const asyncHandler=require('express-async-handler');
let {getAll,getOne,deleteOne,updateOne,createOne}=require('../utils/apiFactory')
let getSubcategories=getAll(Subcategory);
let updateSubcategory=updateOne(Subcategory);
let deleteSubcategory=deleteOne(Subcategory);
let getSubcategory=getOne(Subcategory);
let createSubcategory=createOne(Subcategory);
let setCategoryId=asyncHandler(async (req,res,next)=>{
    if(req.params.categoryId){
        req.filterObj={category:req.params.categoryId};
    }
    next();
})
module.exports={getSubcategories, updateSubcategory,
    deleteSubcategory, createSubcategory ,getSubcategory,setCategoryId};