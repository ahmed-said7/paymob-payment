const express=require('express');
const globalError=require('./middllewares/globalError');
const cors=require('cors');
const apiError = require('./utils/apiError');
const productRoute=require('./routes/productRoute');
const authRoute=require('./routes/authRoute');
const userRoute=require('./routes/userRoute');
const cartRoute=require('./routes/cartRoute');
const orderRoute=require('./routes/orderRoute');
const {webhookCheckout,successPage}=require('./services/orderServices'); 

const apis=(app)=>{
    app.use(cors({origin:"*"}));
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.static('uploads'));
    app.post('/webhook',webhookCheckout );
    app.get('/state',successPage);
    app.use('/product',productRoute);
    app.use('/user',userRoute);
    app.use('/auth',authRoute);
    app.use('/cart',cartRoute);
    app.use('/order',orderRoute);
    app.all('*', (req, res, next) => {
        next(new apiError(`Can't find this route`, 400));
    });
    app.use(globalError);
};

module.exports=apis;