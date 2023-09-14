const asyncHandler=require('express-async-handler');
const cartModel=require('../models/cartModel');
const apiError = require('../utils/apiError');
const orderModel=require('../models/orderModel');
const productModel = require('../models/productModel');
const firststep=require('../utils/session');

const createOrder=asyncHandler(async (req,res,next)=>{
    const cart=await cartModel.findById(req.params.cartId);
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    const order=await orderModel.create({
        user: req.user._id,
        cartItems:cart.cartItems
    });

    order.totalPrice= cart.totalPriceAfterDiscount ? 
        cart.totalPriceAfterDiscount : cart.totalPrice;

    await Promise.all(
        
        cart.cartItems.map(async(item)=>{
        await productModel.findByIdAndUpdate(item.product,{
            $inc:{sold : item.quantity}
        });

    })
    )
    await order.save();
    await cartModel.findByIdAndDelete(req.params.cartId);

    res.status(200).json({status: 'success',order});

});

const getUserOrders=asyncHandler(async(req, res, next)=>{
    const orders=await orderModel.find({user: req.user._id});
    res.status(200).json({status: 'success',orders});
});

const updateDeliveredOrder = asyncHandler(async(req, res, next) => {
    const order=await orderModel.findByIdAndUpdate(req.params.id,
        {isDelivered: true , deliveredAt:new Date()},
        {new:true});
    if(!order){
        return next(new apiError('no order found',400));
    }
    res.status(200).json({order});
});

const updatePaidOrder = asyncHandler(async(req, res, next) => {
    const order=await orderModel.findByIdAndUpdate(req.params.id,
        {isPaid: true , paidAt:new Date()},
        {new:true});
    if(!order){
        return next(new apiError('no order found',400));
    };
    res.status(200).json({order});
});

const createSessions=asyncHandler(async(req, res, next)=>{
    let cart=await cartModel.findById(req.params.cartId);
    if(!cart){
        return next(new apiError("Cart not found",400));
    };
    
    const result=await firststep(cart,req.user);
    res.status(200).json({result});

})

const webhookCheckout = asyncHandler( async (req,res,next)=>{

    console.log("#########################");
    console.log(JSON.parse(req.obj));
    console.log("#########################");
});

module.exports={updatePaidOrder,updateDeliveredOrder
    ,getUserOrders,createOrder,createSessions,webhookCheckout};