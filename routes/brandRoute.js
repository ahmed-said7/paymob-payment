let express= require('express');
let router=express.Router();

let {getBrands, updateBrand, deleteBrand, createBrand ,getBrand}
    =require('../services/brandServices');

let {deleteBrandValidator,createBrandValidator,
    updateBrandValidator,
    getBrandValidator}=require('../validator/brandValidator');

const {uploadSingleImage,uploadMultipleImage,resizeSingleImage}
    =require('../middllewares/imageMiddleware');

router.route('/')
    .get(getBrands)
    .post(uploadSingleImage('image'),
    resizeSingleImage('brand'),createBrandValidator,createBrand);

router.route('/:id').
    get(getBrandValidator,getBrand).
    delete(deleteBrandValidator,deleteBrand).
    patch(updateBrandValidator,updateBrand);

module.exports=router;
