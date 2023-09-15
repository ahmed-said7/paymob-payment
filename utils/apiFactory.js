let asyncHandler=require('express-async-handler')
let apiFeatures=require('../utils/apiFeatures');
const apiError = require('../utils/apiError');
let getOne=(model)=> asyncHandler ( async(req,res,next)=>{
    let id=req.params.id;
    let document=await model.findById(id);
    if(!document){
        return next(new apiError(`Couldn't find ${model} for ${id}`,400));
    };
    res.status(200).json({status:"success",result:document});
    });
let createOne=(model)=> asyncHandler(async(req,res,next)=>{
    let document=await model.create(req.body);
    if(!document){
        return next(new apiError(`Couldn't create ${model} `,400));
    };
    await document.save();
    res.status(200).json({status:"success",result:document}); 
    })
let updateOne=(model)=> asyncHandler(async(req,res,next)=>{
    let document=await model.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
    if(!document){
        return next(new apiError(`Couldn't find ${model} for ${req.params.id}`,400));
    };
    await document.save();
    res.status(200).json({status:"success",result:document});
    });
let deleteOne=(model)=> asyncHandler(async(req,res,next)=>{
        let document=await model.findByIdAndDelete(req.params.id);
        if(!document){
            return next(new apiError(`Couldn't find ${model} for ${id}`,400));
        };
        // await document.remove();
        res.status(200).json({status:"success",result:`document deleted`});
        });
let getAll=(model)=> asyncHandler(async(req,res,next)=>{
    if(!req.filterObj){
        req.filterObj={};
    };
    const endIndex=await model.countDocuments();
    const features=new apiFeatures(model.find(),req.query).filter(req.filterObj)
    .sort().search().selectFields().pagination(endIndex);
    const query=await features.query;
    const pagination=await features.Obj;
    res.status(200).json({pagination,query});
});

module.exports={getAll,getOne,createOne,updateOne,deleteOne};
