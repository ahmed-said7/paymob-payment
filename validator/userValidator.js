const validationMiddleware=require('../middllewares/validationMiddleware');
const {check,body}=require('express-validator');
const userModel=require('../models/userModel');
const bcrypt=require('bcryptjs');


const createUserValidator=[
    check('name').notEmpty().withMessage('name is required')
    .isString().withMessage('name should be a string'),
    ,check('email').notEmpty().withMessage('email is required')
    .isEmail().withMessage('invalid email address')
    .custom(async(val)=>{
        const user=await userModel.findOne({email:val});
        if(user){return Promise.reject(new Error('provide another email'));}
        return true;
    })
    ,check("password").notEmpty().withMessage('passwoed is required').
    isString().withMessage('password should be a string').
    isLength({min:6}).withMessage('password should be at least 6 characters')
    ,check('phone').optional().isMobilePhone().
    withMessage('input should be mobile phonr'),
    validationMiddleware
];

const getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validationMiddleware
];

const updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    check('email').optional()
    .isEmail().withMessage('invalid email address')
    .custom(async(val)=>{
        const user=await userModel.findOne({email:val});
        if(user){return Promise.reject(new Error('provide another email'));}
        return true;
    }),
    validationMiddleware
];

const deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validationMiddleware
];
const changeUserPasswordValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    body('currentPassword').notEmpty().withMessage('currrent password is required')
    .custom(async(val,{req})=>{
            const user=await userModel.findById(req.params.id)
            if(!user){
                return Promise.reject(new Error('no user found for Id'));
            };
            const valid=await bcrypt.compare(val,user.password);
            if(!valid){
                return Promise.reject(new Error(' current password is not correct '));
            };
            return true;
    }),
    check("password").notEmpty().withMessage('password is required').
    isString().withMessage('password should be a string').
    isLength({min:6}).withMessage('password should be at least 6 characters')
    ,validationMiddleware]

const updateLoggedUserValidator = [
        check('email').optional()
        .isEmail().withMessage('invalid email address')
        .custom(async(val)=>{
            const user=await userModel.findOne({email:val});
            if ( user ){ return Promise.reject(new Error('provide another email')); };
            return true;
        }) , validationMiddleware
    ];

const changeLoggedUserPasswordValidator = [
        check('currentPassword').
        notEmpty().withMessage('currrent password is required')
        .custom( async (val,{req})=>{
                const currentUser=req.user;
                const valid=await bcrypt.compare(val,currentUser.password);
                if(!valid){
                    return Promise.reject(new Error('Current password is not correct '));
                };
                return true;
        }),
        check("password").notEmpty().withMessage('password is required').
        isString().withMessage('password should be a string').
        isLength({min:6}).withMessage('password should be at least 6 characters')
        ,validationMiddleware]

module.exports={createUserValidator,getUserValidator,updateUserValidator,
    deleteUserValidator,changeUserPasswordValidator,updateLoggedUserValidator,
    changeLoggedUserPasswordValidator};