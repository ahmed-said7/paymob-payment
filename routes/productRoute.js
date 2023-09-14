let express= require('express');
let router=express.Router({mergeParams:true});

let {deleteProductValidator,createProductValidator

    ,updateProductValidator,getProductValidator}=require('../validator/productValidator')

let {getProducts, updateProduct, deleteProduct,setSubcategoryId, createProduct ,getProduct }
    =require('../services/productServices');

let {uploadMultipleImage,
    resizeMultipleImages}=require('../middllewares/imageMiddleware');

router.route('/').
    get(setSubcategoryId,getProducts).
    post(uploadMultipleImage([{name:"images",maxCount:7}
    ,{name:"coverImage",maxCount:1}]),
    resizeMultipleImages,
    createProductValidator,createProduct);
    
router.route('/:id').
    get(getProductValidator,getProduct).
    delete(deleteProductValidator,deleteProduct).
    patch(updateProductValidator,updateProduct)


module.exports=router;