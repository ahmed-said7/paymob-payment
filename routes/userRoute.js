let express= require('express');
let router=express.Router();

const {allowedTo,protect}=require('../services/authService');
const{changeUserPassword,
        updateUser,createUser,
        getUsers,deleteUser,getUser}=require('../services/userService');

router.use(protect,allowedTo('admin','manager'))

router.route('/').post(createUser)
    .get(getUsers);


router.route('/:id').get(getUser)
    .delete(deleteUser)
    .patch(updateUser);

router.route('/update-password/:id').patch(changeUserPassword);

module.exports=router;