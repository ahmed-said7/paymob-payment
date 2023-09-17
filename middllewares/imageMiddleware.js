const multer=require('multer');
const uuid=require('uuid');
const apiError = require('../utils/apiError');
const asyncHandler=require('express-async-handler');
const sharp = require('sharp');
const cloudinary=require('../utils/cloud');

const uploadImage=()=>{
    const storage=multer.memoryStorage();
    const filter=function(req,file,cb){
        if(file.mimetype.startsWith('image')){
            return cb(null,true);
        }else{
            return cb(new apiError('required file of type image'),false);
        }
    }
    return multer({storage,fileFilter:filter});
};

const uploadSingleImage=function(field){
    return uploadImage().single(field);
}

const uploadMultipleImage=function(field){
    return uploadImage().fields(field);
}

const resizeSingleImage=(model)=> asyncHandler(async(req,res,next)=>{
    if(req.file){
        const filename=`${model}-${Date.now()}-${uuid.v4()}.jpeg`;
        req.body.image=filename;
        await sharp(req.file.buffer).resize(600,600).toFormat('jpeg').
        jpeg({quality:90}).toFile(`uploads/${model}/${filename}`);
        req.body.cloud=(await cloudinary.uploader.upload(`uploads/${model}/${filename}`)).secure_url; 
    }
    next();
});

const resizeMultipleImages=asyncHandler(async(req,res,next)=>{
    // console.log(req.files);
    // if(req.files){
    //     let filename;
    //     if(req.files.images){
    //         req.body.images=[];
    //         await Promise.all(
    //             req.files.images.map(async(img)=>{
    //                 filename=`product-${Date.now()}-${uuid.v4()}.jpeg`;
    //                 req.body.images.push(filename);
    //                 return await sharp(img.buffer).resize(600,600).toFormat('jpeg').
    //                 jpeg({quality:90}).toFile(`uploads/product/${filename}`);
    //             })
    //         );
    //     };
    //     if(req.files.coverImage){
    //         filename=`product-${Date.now()}-${uuid.v4()}.jpeg`;
    //         req.body.coverImage=filename;
    //         await sharp(req.files.coverImage[0].buffer).
    //         resize(600,600).toFormat('jpeg').
    //         jpeg({quality:90}).toFile(`uploads/product/${filename}`);
    //     };
    // }
    // next();
})

module.exports={uploadSingleImage,uploadMultipleImage,
    resizeSingleImage,resizeMultipleImages};