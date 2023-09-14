const asyncHandler=require('express-async-handler');
const cartModel=require('../models/cartModel');
const apiError = require('../utils/apiError');
const productModel = require('../models/productModel');


const addProductToCart=asyncHandler( async (req,res,next)=>{
    const { productId } = req.body ;
    const quantity = req.body.quantity || 1;
    let cart=await cartModel.findOne({user:req.user._id});
    let product=await productModel.findById(productId);
    if(!cart){
        cart=await cartModel.create({user:req.user._id})
        cart.cartItems=[{ product:productId , price:product.price ,quantity }];
    }else{
        const index=cart.cartItems.findIndex( (item)=> item.product==productId );
        if(index>-1){
            cart.cartItems[index].quantity = quantity;
        }else{
            cart.cartItems.push({ product:productId , price:product.price , quantity})
        };
    };
    cart.totalPrice=0;
    cart.cartItems.forEach((item)=>{
        cart.totalPrice += item.price*item.quantity;
    })
    await cart.save();
    res.status(200).json({cart});

});


const deleteLoggedUserCart=asyncHandler ( async (req,res,next)=> {
    const cart=await cartModel.findOneAndDelete({user:req.user._id});
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    res.status(200).json({ status: 'success' , deletedCart:cart });
});

const deleteProductCart =asyncHandler(async (req, res , next) => {
    const {productId} = req.params;
    const cart=await cartModel.findOne({user:req.user._id});
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    Items=cart.cartItems.filter( ( item ) => item.product != productId);
    cart.cartItems=Items;
    cart.totalPrice=0;
    cart.cartItems.forEach((item)=>{
        cart.totalPrice += item.price*item.quantity;
    })
    await cart.save();
    res.status(200).json({cart});
});

const getLoggedUserCart=asyncHandler(async(req,res,next)=>{
    const cart=await cartModel.findOne({user:req.user._id});
    if(!cart){
        return res.status(200).json({cart:[]});
    };
    res.status(200).json({cart});
});

module.exports={deleteProductCart,deleteLoggedUserCart,addProductToCart,getLoggedUserCart};