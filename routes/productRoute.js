let express= require('express');
let router=express.Router({mergeParams:true});

let {deleteProductValidator,createProductValidator

    ,updateProductValidator,getProductValidator}=require('../validator/productValidator')

let {getProducts, updateProduct, deleteProduct,createProduct ,getProduct,addSizeToProduct }
    =require('../services/productServices');


let {uploadMultipleImage,uploadSingleImage,resizeSingleImage,
    resizeMultipleImages}=require('../middllewares/imageMiddleware');

const {allowedTo,protect}=require('../services/authService');


router.use(protect);

router.route('/').
    get(allowedTo('user','admin','manager'),getProducts).
    post(allowedTo('admin','manager'),
    uploadSingleImage('image'),
    resizeSingleImage('product'),
    createProductValidator,addSizeToProduct,createProduct);
    
router.route('/:id').
    get(allowedTo('user','admin','manager'),getProductValidator,getProduct).
    delete(allowedTo('admin','manager'),deleteProductValidator,deleteProduct).
    patch(allowedTo('admin','manager'),uploadSingleImage('image'),resizeSingleImage('product')
    ,updateProductValidator,addSizeToProduct,updateProduct);


module.exports=router;