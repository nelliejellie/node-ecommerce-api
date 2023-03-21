const Order = require('../models/order');
const Product = require("../models/product")
const mongoose = require('mongoose')

// get all products
exports.get_all_products = (req,res,next)=>{
    Product.find()
    .select("name price _id productImage")
    .exec()
    .then(docs =>{
        const response = {
            count : docs.length,
            product: docs
        }
        console.log(docs);
        res.status(200).json(response)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

// create a product
exports.creat_product = async(req,res,next)=>{
    //get product from request
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    // save product
    await product.save();

    // return response
    res.status(201).json({
        message: "successful",
        payload: product
    })
}


// get a product by id
exports.get_product_by_id = (req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then(doc => {
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message:"no item with this id"})
        }
        
    })
    .catch(err => console.log(err));
}


// edit a product
exports.edit_product = (req, res, next)=>{
    const id = req.params.productId;
    Product.updateOne({_id:id},{$set:{name: req.body.newName, price: req.body.price}})
    .exec()
    .then(result=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
    });
}

// delete a product
exports.delete_product = (req, res, next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}