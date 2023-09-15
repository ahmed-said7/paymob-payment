let express= require('express');
let router=express.Router();


const {updateLoggedUserValidator,createUserValidator
    ,changeLoggedUserPasswordValidator}=require('../validator/userValidator');

const {uploadSingleImage,resizeSingleImage}
    =require('../middllewares/imageMiddleware');

const {getLoggedUser,updateLoggedUser,changeLoggedUserPassword,
    deleteLoggedUser,setPasswordToNull}=require('../services/userService');

const {allowedTo,login,signup,protect}=require('../services/authService');


router.route('/signup')
    .post( uploadSingleImage('image') , resizeSingleImage('user') , signup);

router.route('/login').post(login);

router.use(protect,allowedTo('user','admin','manager'))

router.route('/get-me')
    .get(getLoggedUser);

router.route('/update-me')
    .patch(uploadSingleImage('image'),
    resizeSingleImage('user'),setPasswordToNull,updateLoggedUser);

router.route('/update-password').patch(changeLoggedUserPassword);

router.route('/delete-me').delete(deleteLoggedUser);

module.exports=router;