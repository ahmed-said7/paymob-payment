let express= require('express');
let router=express.Router();

let {getCategories, updateCategory, deleteCategory, createCategory ,getCategory}
    =require('../services/categoryServices');

const {uploadSingleImage,uploadMultipleImage,resizeSingleImage}
    =require('../middllewares/imageMiddleware');

const subcategoryRoute=require('../routes/subcategoryRoute');

let {deleteCategoryValidator,createCategoryValidator,updateCategoryValidator,getCategoryValidator}=
require('../validator/categoryValidator');

router.route('/').
    get(getCategories).
    post(uploadSingleImage('image'),
    resizeSingleImage('category'),createCategoryValidator,createCategory);



router.route('/:id').
    get(getCategoryValidator,getCategory)
    .delete(deleteCategoryValidator,deleteCategory)
    .patch(updateCategoryValidator,updateCategory);

router.use("/subcategory/:categoryId",subcategoryRoute);

module.exports = router;