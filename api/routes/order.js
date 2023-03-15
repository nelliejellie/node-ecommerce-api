const express = require('express')
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: "Handling GET requests to /products"
    })
});


router.post('/', (req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: "successful",
        payload:order
    })
})

router.get('/:orderId', (req, res, next)=>{
    const id = req.params.orderId;
    if(id === 'special'){
        res.status(200).json({
            message: "you discovered the special id",
            id: id
        })
    }else{
        res.status(200).json({
            message:"you passed an id"
        })
    }
})

router.patch('/:orderId', (req, res, next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message: "updated order",
        id: id
    })
})

router.delete('/:orderId', (req, res, next)=>{
    const id = req.params.orderId;
    res.status(200).json({
        message: "deleted order",
    })
})


module.exports = router; 