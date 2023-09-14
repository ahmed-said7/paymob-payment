let express=require('express');
let app = express();
require('dotenv').config();
let globalError=require('./middllewares/globalError');
require('./database/ConnectionToDb')();
const cors=require('cors');
let apiError = require('./utils/apiError');
let categoryRoute=require('./routes/categoryRoute');
let subCategoryRoute=require('./routes/subcategoryRoute');
let brandRoute=require('./routes/brandRoute');
let productRoute=require('./routes/productRoute');

app.use(cors({origin:"*"}));

app.use(express.json());
app.use(express.static('uploads'));
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/subcategory',subCategoryRoute);
app.use('/api/v1/brand',brandRoute);
app.use('/api/v1/product',productRoute);

app.all('*', (req, res, next) => {
    next(new apiError(`Can't find this route`, 400));
});
app.use(globalError)

app.listen(4040,()=>{
    console.log('listening on port');
})
