
let Product=require('../models/productModel');
let asyncHandler=require('express-async-handler');
let {getAll,getOne,deleteOne,updateOne,createOne}=require('../utils/apiFactory')
let getProducts=getAll(Product);
let updateProduct=updateOne(Product);
let deleteProduct=deleteOne(Product);
let getProduct=getOne(Product);
let createProduct=createOne(Product);
const addSizeToProduct=asyncHandler(async(req,res,next)=>{
    if(req.body.size){
        req.body.size=req.body.size.split('&');
    };
    return next();
})


module.exports={getProducts, updateProduct,addSizeToProduct
    , deleteProduct, createProduct,getProduct}