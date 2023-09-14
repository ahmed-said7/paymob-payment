let express= require('express');
let router=express.Router();

let {getCategories, updateCategory, deleteCategory, createCategory ,getCategory}
    =require('../services/categoryServices');

const {uploadSingleImage,uploadMultipleImage,resizeSingleImage}
    =require('../middllewares/imageMiddleware');


let {deleteCategoryValidator,createCategoryValidator,updateCategoryValidator,getCategoryValidator}=
require('../validator/categoryValidator');

const {allowedTo,protect}=require('../services/authService');


// router.use(protect);

router.route('/').
    get(getCategories).
    post(uploadSingleImage('image'),
    resizeSingleImage('category'),createCategoryValidator,createCategory);



router.route('/:id').
    get(getCategoryValidator,getCategory)
    .delete(deleteCategoryValidator,deleteCategory)
    .patch(updateCategoryValidator,updateCategory);


module.exports = router;