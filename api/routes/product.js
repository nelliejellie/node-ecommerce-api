const express = require('express')
const router = express.Router();
const Product = require('../models/product')

router.get('/', (req,res,next)=>{
    Product.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
});

// post product endpoint
router.post('/', async(req,res,next)=>{
    //get product from request
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    // save product
    await product.save();

    // return response
    res.status(201).json({
        message: "successful",
        payload: product
    })
})

// get a particular item by id
router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message:"no item with this id"})
        }
        
    })
    .catch(err => console.log(err));
})

router.patch('/:productId', (req, res, next)=>{
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
})

router.delete('/:productId', (req, res, next)=>{
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
})

module.exports = router; 