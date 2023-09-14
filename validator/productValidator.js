let validationMiddleware=require('../middllewares/validationMiddleware');
let {check}=require('express-validator')
let Category=require('../models/categoryModel');

let createProductValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name must be a string').
    isLength({min:4}).withMessage('name must be at least 4 characters')
    ,check('description').notEmpty().withMessage('description is required').
    isString().withMessage('description must be a string').
    isLength({min:10}).withMessage('description at least 10 characters'),
    check('quantity').optional()
    .isNumeric().withMessage('quantity must be a number'),
    check('price').notEmpty().withMessage('price is required')
    .isNumeric().withMessage('quantity must be a number'),
    check('priceAfterDiscount').optional().isNumeric().
    withMessage('price After Discount must be a number')
    ,check('colors').optional().isArray().withMessage('colors must be an array'),
    check('category').optional().
    isMongoId().withMessage('category must be valid Id').
    custom(async(val)=>{
        let cat=await Category.findById(val)
        if(!cat){return Promise.reject(new Error('Cannot find category'));}
        return true;
    }),validationMiddleware
];

let getProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    validationMiddleware
];

let updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    check('name').optional().
    isString().withMessage('name must be a string').
    isLength({min:4}).withMessage('name must be at least 4 characters')
    ,check('description').optional().
    isString().withMessage('description must be a string').
    isLength({min:10}).withMessage('description is too short'),
    check('quantity').optional()
    .isNumeric().withMessage('quantity must be a number'),
    check('price').optional()
    .isNumeric().withMessage('price must be a number'),
    check('priceAfterDiscount').optional().isNumeric().
    withMessage('price After Discount must be a number')
    ,check('colors').optional().
    isArray().withMessage('colors must be an array'),
    validationMiddleware
];

let deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    validationMiddleware
];

module.exports =
{deleteProductValidator,createProductValidator,updateProductValidator,getProductValidator};