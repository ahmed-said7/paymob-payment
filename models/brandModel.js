const mongoose = require('mongoose');
require('dotenv').config();
const brandSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique: [true, 'Brand must be unique'],
        minlength: [3, 'Too short Brand name'],
        maxlength: [32, 'Too long Brand name'],
    },
    image: String,
} , { timestamps: true }
);

// 2- Create model

brandSchema.post("init",function(doc){
    if(doc.image){
        doc.image=`${process.env.base_url}/brand/${doc.image}`;
    };
})

let brandModel = mongoose.model('Brand', brandSchema);
module.exports=brandModel;