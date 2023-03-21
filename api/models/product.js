const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{type: String, Required:true},
    price:{type: Number, Required:true},
    productImage: {type:String, required:true}
});

module.exports = mongoose.model('Product', productSchema)