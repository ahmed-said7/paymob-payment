const mongoose = require('mongoose');
const { toObject } = require('mongoose/lib/utils');
require('dotenv').config();

const productSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Too short product description'],
    },
    quantity: {
        type: Number,
        default:10,
    },
    sold: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'Too long product price'],
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    imageCover: {
        type: String
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product must be belong to category'],
    },
    subcategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subcategory',
        },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
    },
    images: [String],
    
},
    { timestamps: true }
);

productSchema.pre(/^find/ig,function(next){
    if(this.category){
        this.populate({path:"category",select:"name"});
    };
    return next();
})


productSchema.post('init',function(doc){
    if(doc.imageCover){
        doc.imageCover=`{process.env.base_url}/product/${doc.imageCover}`;
    };
    if(doc.images){
        let images=[];
        doc.images.forEach((img)=>{
            images.push(`${process.env.base_url}/product/${img}`);
        });
        doc.images=images;
    }
})

let productModel = mongoose.model('Product', productSchema);
module.exports=productModel;