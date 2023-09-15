let express= require('express');
let router=express.Router();
const {allowedTo,protect}=require('../services/authService');
const {deleteProductCart,deleteLoggedUserCart,addProductToCart,getLoggedUserCart}
        =require('../services/cartServices');


router.use(protect,allowedTo('admin','manager','user'));

router.route('/add-product').
    post(addProductToCart);

router.route('/').get(getLoggedUserCart);

router.route('/delete-product/:productId').delete(deleteProductCart);


router.route('/delete-cart').
    delete(deleteLoggedUserCart);

module.exports=router;