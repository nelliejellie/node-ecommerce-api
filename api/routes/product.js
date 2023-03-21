const express = require('express')
const router = express.Router();
const Product = require('../models/product')
// for posting images
const multer = require('multer')
// middleware for checking user authentication
const checkAuth = require('../middleware/check-auth')

const ProductController = require('../controllers/product')

// set up a storage object for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null,file.originalname)
    }
})




// filter some files
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        // save the file
        cb(null, true)
    }else{
        cb(null, false)
    }
}

// upload for posting images
const upload = multer({storage:storage,
     limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', ProductController.get_all_products);

// post product endpoint
router.post('/',checkAuth, upload.single('productImage'), ProductController.creat_product)

// get a particular item by id
router.get('/:productId', ProductController.get_product_by_id)

router.patch('/:productId',checkAuth, ProductController.edit_product)

router.delete('/:productId',checkAuth, ProductController.delete_product)

module.exports = router; 