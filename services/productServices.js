
const asyncHandler=require('express-async-handler');
let Product=require('../models/productModel')
let {getAll,getOne,deleteOne,updateOne,createOne}=require('../utils/apiFactory')
let getProducts=getAll(Product);
let updateProduct=updateOne(Product);
let deleteProduct=deleteOne(Product);
let getProduct=getOne(Product);
let createProduct=createOne(Product);
let setSubcategoryId=asyncHandler(async (req,res,next)=>{
    if(req.params.subcategoryId){
        req.filterObj={subcategory:req.params.subcategoryId};
    }
    next();
})

module.exports={getProducts, updateProduct, deleteProduct,setSubcategoryId, createProduct,getProduct}