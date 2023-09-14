let express= require('express');
let router=express.Router({mergeParams:true});
const productRouter=require('../routes/productRoute');

let {getSubcategories,setCategoryId, updateSubcategory, deleteSubcategory, createSubcategory ,getSubcategory}
    =require('../services/subcategoryServices');

let {deleteSubcategoryValidator,
    createSubcategoryValidator,
    updateSubcategoryValidator,getSubcategoryValidator}=require('../validator/subcategoryValidator');

const {uploadSingleImage,resizeSingleImage}
    =require('../middllewares/imageMiddleware');

router.route('/').get(getSubcategories)
    .post(uploadSingleImage('image'),
    resizeSingleImage('subcategory'),createSubcategoryValidator,
        createSubcategory);
router.route('/:id').get(getSubcategoryValidator,setCategoryId,getSubcategory).
        delete(deleteSubcategoryValidator,deleteSubcategory)
        .patch(updateSubcategoryValidator,updateSubcategory);

router.use('/product/:subcategoryId',productRouter)

module.exports=router;