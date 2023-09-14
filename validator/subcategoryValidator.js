let validationMiddleware=require('../middllewares/validationMiddleware');
let {check}=require('express-validator');
let Category=require('../models/categoryModel');

let createSubcategoryValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name must be a string').
    isLength({min:4,max:20}).withMessage('name must be at least 6 characters'),
    check('category').notEmpty().withMessage('category is required').
    isMongoId().withMessage('invalid Id').
    custom(async(val)=>{
        let cat=await Category.findById(val);
        if(!cat){
            return Promise.reject(new Error('no category found for Id'))
        };
        return true;
    })

    ,validationMiddleware
];

let getSubcategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validationMiddleware,
];

let updateSubcategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    check('name').optional()
    .isString().withMessage('name must be a string').
    isLength({min:6,max:20}).withMessage('name must be at least 6 characters'),
    validationMiddleware,
];

let deleteSubcategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validationMiddleware,
];

module.exports =
{deleteSubcategoryValidator,createSubcategoryValidator,updateSubcategoryValidator,getSubcategoryValidator};