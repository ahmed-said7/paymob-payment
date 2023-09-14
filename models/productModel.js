const mongoose = require('mongoose');
require('dotenv').config();

const productSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
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
        required: true,
        trim: true,
        max: 200000,
    },
    priceAfterDiscount: {
        type: Number,
    },
    colors: [String],
    coverImage: {
        type: String
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
    },
    images: [String],
    
},
    { timestamps: true }
);

productSchema.pre(/^find/ig,function(next){
    his.populate("category");
    next();
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