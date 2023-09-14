let express= require('express');
let router=express.Router();

const {uploadSingleImage,resizeSingleImage}
    =require('../middllewares/imageMiddleware');

const {getLoggedUser,updateLoggedUser,changeLoggedUserPassword,
    deleteLoggedUser}=require('../services/userService');

const {allowedTo,login,signup,protect}=require('../services/authService');


router.route('/signup')
    .post( uploadSingleImage('image') , resizeSingleImage('user') , signup);

router.route('/login').post(login);

router.use(protect,allowedTo('user','admin','manager'))

router.route('/get-me')
    .get(getLoggedUser);

router.route('/update-me')
    .patch(uploadSingleImage('image'),resizeSingleImage('user') ,updateLoggedUser);

router.route('/update-password').patch(changeLoggedUserPassword);

router.route('/delete-me').patch(deleteLoggedUser);

module.exports=router;