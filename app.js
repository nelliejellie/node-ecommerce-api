// packages
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const config = require("./config")




//mongoose.connect('mongodb://localhost:27017/products')

//routes
const productRoutes = require('./api/routes/product')
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/user')

// mongoose.connect('mongodb+srv://emekaewelike:' + process.env.MONGO_ATLAS_PW + '@node-rest-api.d9zqiax.mongodb.net/?retryWrites=true&w=majority')
// .catch(err => console.log(err))


config.connect()

// used for loggin requests
app.use(morgan('dev'));
// for making the uploads file public
app.use('/uploads',express.static('uploads'))
// used to parse incoming requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// prevent cors error
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers',
//      'Origin, X-Requested_With, COntent-Type, Accept, Authorization'
//     );
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET')
//         return res.status(200).json({});
//     }
// })

// routes for handling requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message: error.message
        }
    })
})

module.exports = app;



// mongopassword = gBEMVQAqQkRnTgPg