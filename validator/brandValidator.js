let validationMiddleware=require('../middllewares/validationMiddleware');
let {check}=require('express-validator')
let createBrandValidator=[
    
    check('name').notEmpty().withMessage('name is required').
    isString().withMessage('name is required').
    isLength({min:6,max:20}).withMessage('name must be at least 6 characters')
    ,validationMiddleware
];

let getBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validationMiddleware,
];

let updateBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    check('name').optional().
    isString().isString('name is required').
    isLength({min:6,max:20}).withMessage('name must be at least 6 characters')
    ,
    validationMiddleware,
];

let deleteBrandValidator = [
    check('id').isMongoId().withMessage('Invalid Brand id format'),
    validationMiddleware,
];

module.exports =
{deleteBrandValidator,createBrandValidator,updateBrandValidator,getBrandValidator};