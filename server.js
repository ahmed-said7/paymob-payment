const express=require('express');

const app = express();

require('dotenv').config();

require('./database/ConnectionToDb')();

require('./apis')(app);

app.listen(4040,()=>{
    console.log('listening on port on port 4040 ');
})
