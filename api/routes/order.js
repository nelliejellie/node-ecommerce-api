const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const Order = require('../models/order');
const Product = require("../models/product")
const checkAuth = require('../middleware/check-auth')

const OrdersController = require("../controllers/orders")

//get all orders
router.get('/',checkAuth, OrdersController.order_get_all);

// post an order
router.post('/',checkAuth,OrdersController.create_order)

// find an order by order id
router.get('/:orderId',checkAuth,OrdersController.get_order_by_id)

router.patch('/:orderId',checkAuth, OrdersController.edit_order)

// delete an order
router.delete('/:orderId',checkAuth, OrdersController.delete_order)


module.exports = router; 