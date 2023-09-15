const mongoose  = require("mongoose");

let orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
    ,cartItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            price:Number,quantity:Number
        }
    ],
    isDelivered:{
        type:Boolean,default:false
    },
    deliveredAt:Date,
    isPaid:{
        type:Boolean,default:false
    },
    paidAt:Date,
    paymentMethod:{
        type:String
        // ,default:"cash"
        ,enum:["cash","online"]
    },
    totalPrice:{
        type:Number
    },
    city:String,
    postalCode:String,
    details:String,
    phone:String,
},{timestamps:true});



let orderModel=mongoose.model('Order',orderSchema);

module.exports=orderModel;