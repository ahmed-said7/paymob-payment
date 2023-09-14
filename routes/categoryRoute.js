let express= require('express');
let router=express.Router();

let {getCategories, updateCategory, deleteCategory, createCategory ,getCategory}
    =require('../services/categoryServices');

const {uploadSingleImage,uploadMultipleImage,resizeSingleImage}
    =require('../middllewares/imageMiddleware');


let {deleteCategoryValidator,createCategoryValidator,updateCategoryValidator,getCategoryValidator}=
require('../validator/categoryValidator');

const {allowedTo,protect}=require('../services/authService');


router.use(protect);

router.route('/').
    get(allowedTo('user','admin','manager'),getCategories).
    post(allowedTo('admin','manager'),uploadSingleImage('image'),
    resizeSingleImage('category'),createCategoryValidator,createCategory);



router.route('/:id').
    get(allowedTo('user','admin','manager'),getCategoryValidator,getCategory)
    .delete(allowedTo('admin','manager'),deleteCategoryValidator,deleteCategory)
    .patch(allowedTo('admin','manager'),updateCategoryValidator,updateCategory);


module.exports = router;