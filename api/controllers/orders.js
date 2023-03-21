const Order = require('../models/order');
const Product = require("../models/product")
const mongoose = require('mongoose')

// get all orders
exports.order_get_all =  async(req,res,next)=>{
    Order.find()
        .select('product quantity _id')
        .populate("product")
        .exec()
        .then(docs =>{
        res.status(200).json(docs)
        })
        .catch(err =>{
        console.log(err)
    })
 }

 // create an order
 exports.create_order =  (req,res,next)=>{
    Product.findById(req.body.productId)
    .then(product =>{
        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save()
    })
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: "Order stored",
            createdOrder:{
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            message: 'Product not found'
        })
    })
    const order = new Order({
        quantity: req.body.quantity,
        product: req.body.productId
    }) 

    order.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Order stored',
            createdOrder:{
                _id: result._id,
                product:result.product,
                quantity:result.quantity
            }
        })
    })

}

//get an order by id
exports.get_order_by_id =  (req, res, next)=>{
    Order.findById(req.params.orderId)
    .exec()
    .then(order =>{
        res.status(200).json({
            order: order,
            request:{
                type: 'GET',
                url:'http://localhost:3000/orders'
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    });
}

//edit an order
exports.edit_order = (req, res, next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message: "updated order",
        id: id
    })
}

// delete an order
exports.delete_order =  (req, res, next)=>{
    Order.remove({ _id:req.params.orderId})
    .exec()
    .then(result =>{
        res.status(200).json({
            order: order,
            request:{
                type:"GET",
                url:"http://localhost:3000/orders/"
            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })
}