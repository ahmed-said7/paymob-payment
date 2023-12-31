const asyncHandler=require('express-async-handler');
const cartModel=require('../models/cartModel');
const apiError = require('../utils/apiError');
const orderModel=require('../models/orderModel');
const productModel = require('../models/productModel');
const userModel=require('../models/userModel');
const firststep=require('../utils/session');
const createHashObj = require('../utils/createHashObj');
const {getOne,getAll,deleteOne}=require('../utils/apiFactory');

const createOrder=asyncHandler(async (req,res,next)=>{
    const cart=await cartModel.findById(req.params.cartId);
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    const order=await orderModel.create({
        user: req.user._id,
        cartItems:cart.cartItems,
        city:req.user.city,
        phone:req.user.phone,
        details:req.user.details,
        postalCode:req.user.postalCode
        ,paymentMethod:"cash"
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

const createOnlineOrder=asyncHandler( async (email,cartId,price)=>{
    const user=await userModel.findOne({email:email});
    const cart=await cartModel.findById(cartId);
    if(!cart){
        return next(new apiError('Cart not found',400));
    };
    const order=await orderModel.create({
        user,cartItems:cart.cartItems,
        paymentMethod:"online",
        isPaid:true,
        paidAt:new Date(),
        totalPrice:price,
        postalCode:user.postalCode,
        details:user.details,
        phone:user.phone,
        city:user.city
    });
    await Promise.all(
        cart.cartItems.map(async(item)=>{
        await productModel.findByIdAndUpdate(item.product,{
            $inc:{sold : item.quantity}
        });
    })
    )
    await order.save();
    await cartModel.findByIdAndDelete(cartId);
    console.log(order._id);
});




const webhookCheckout = asyncHandler( async (req,res,next)=>{
    const hashed=createHashObj(req);
    if(hashed==req.query.hmac){
        const data=req.body.obj.payment_key_claims.billing_data;
        const price=Math.floor( req.body.obj.amount_cents / 100 );
        const email=data.email;
        const cartId=data.last_name;
        createOnlineOrder(email,cartId,price);
    }else{
        return next(new apiError('can not pay , pay failed',400));
    };

});

const deleteOrder=deleteOne(orderModel);
const getOrders=getAll(orderModel);
const getOrder=getOne(orderModel);




const successPage=asyncHandler(async(req,res,next)=>{
    res.render('success');
});

module.exports={updatePaidOrder,updateDeliveredOrder
    ,getUserOrders,createOrder,getOrder,getOrders,deleteOrder,webhookCheckout,createSessions,successPage};