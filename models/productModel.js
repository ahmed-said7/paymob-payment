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
    image: {
        type: String
    },
    category: {
        type: String,
        trim:true
    },
    size:[String]
},
    { timestamps: true }
);

productSchema.post('init',function(doc){
    if(doc.image){
        doc.image=`${process.env.base_url}/product/${doc.image}`;
    };
})

let productModel = mongoose.model('Product', productSchema);
module.exports=productModel;