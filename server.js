let express=require('express');
let app = express();
require('dotenv').config();
let globalError=require('./middllewares/globalError');
require('./database/ConnectionToDb')();
const cors=require('cors');
let apiError = require('./utils/apiError');
const categoryRoute=require('./routes/categoryRoute');
const productRoute=require('./routes/productRoute');
const authRoute=require('./routes/authRoute');
const userRoute=require('./routes/userRoute');
const cartRoute=require('./routes/cartRoute');
const orderRoute=require('./routes/orderRoute');

app.use(cors({origin:"*"}));

app.use(express.json());
app.use(express.static('uploads'));
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/order',orderRoute);

app.all('*', (req, res, next) => {
    next(new apiError(`Can't find this route`, 400));
});
app.use(globalError)

app.listen(4040,()=>{
    console.log('listening on port');
})
