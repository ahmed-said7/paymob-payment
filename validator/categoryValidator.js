let validationMiddleware=require('../middllewares/validationMiddleware');
let {check}=require('express-validator')

let createCategoryValidator=[
    check('name').notEmpty().withMessage('name is required')
    .isString().withMessage('Invalid category name format').
    isLength({min:4,max:20}).withMessage('name must be at least 4 characters')
    ,validationMiddleware
];

let getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validationMiddleware,
];

let updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    check('name').optional()
    .isString().withMessage('Invalid category name format').
    isLength({min:4,max:20}).withMessage('name must be at least 4 characters'),
    
    validationMiddleware,

];

let deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validationMiddleware,

];

module.exports =
{deleteCategoryValidator,createCategoryValidator,updateCategoryValidator,getCategoryValidator};