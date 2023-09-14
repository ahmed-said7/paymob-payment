let validationMiddleware=require('../middllewares/validationMiddleware');
let {check}=require('express-validator')

let createProductValidator=[
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name must be a string').
    isLength({min:4}).withMessage('name must be at least 4 characters')
    ,check('description').notEmpty().withMessage('description is required').
    isString().withMessage('description must be a string').
    isLength({min:10}).withMessage('description at least 10 characters'),
    check('price').notEmpty().withMessage('price is required')
    .isNumeric().withMessage('quantity must be a number'),
    check('priceAfterDiscount').optional().isNumeric().
    withMessage('price After Discount must be a number')
    ,check('category').optional().isString().withMessage('category must be a string'),
    check('size').optional().
    isString().withMessage('size must be string').
    custom(async(val,{req})=>{
        req.body.size = val.split('.');
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
    check('price').optional()
    .isNumeric().withMessage('price must be a number'),
    check('priceAfterDiscount').optional().isNumeric().
    withMessage('price After Discount must be a number')
    ,check('category').optional().isString().withMessage('category must be a string'),
    check('size').optional().
    isString().withMessage('size must be string').
    custom(async(val,{req})=>{
        req.body.size = val.split('.');
        return true;
    }),
    validationMiddleware
];

let deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid Product id format'),
    validationMiddleware
];

module.exports =
{deleteProductValidator,createProductValidator,updateProductValidator,getProductValidator};