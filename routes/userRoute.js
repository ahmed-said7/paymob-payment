let express= require('express');
let router=express.Router();


const {createUserValidator,getUserValidator,updateUserValidator,
        deleteUserValidator,changeUserPasswordValidator}=require('../validator/userValidator')



const {allowedTo,protect}=require('../services/authService');
const{changeUserPassword,
        updateUser,createUser,
        getUsers,deleteUser,getUser,setPasswordToNull}=require('../services/userService');
const { uploadSingleImage,resizeSingleImage } = require('../middllewares/imageMiddleware');

router.use(protect,allowedTo('admin','manager'))


router.route('/').post(uploadSingleImage('image'),
    resizeSingleImage('user'),createUserValidator,createUser)
    .get(getUsers);


router.route('/:id').get(getUserValidator,getUser)
    .delete(deleteUserValidator,deleteUser)
    .patch(updateUserValidator,setPasswordToNull,updateUser);

router.route('/update-password/:id').patch(changeUserPassword);

module.exports=router;