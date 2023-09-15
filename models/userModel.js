const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema(
{
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    city: String,
    phone: String,
    details: String,
    postalCode: String,
    image: String,
    password: {
        type: String,
        required:true,
        minlength: 6,
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user',
    }
},
    { timestamps: true }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    };
    this.password =await bcrypt.hash(this.password,12);
    next();
});

userSchema.post("init",function(doc){
    if(doc.image){
        doc.image=`${process.env.base_url}/user/${doc.image}`;
    };
})

const User = mongoose.model('User', userSchema);

module.exports = User;

