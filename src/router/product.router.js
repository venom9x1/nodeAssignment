const { Router } = require('express')
const ProductController = require('../controller/ProductController')
const { verifyToken, isAdmin, isModerator } = require('../middleware/verifyToken')
const router = Router();

router.get('/', ProductController.getProduct)
router.post('/', [verifyToken, isModerator], ProductController.createProduct)
router.get('/:id', ProductController.getProductByid)
router.put('/:id', [verifyToken, isModerator], ProductController.updateProduct)
router.delete('/:id', [verifyToken, isAdmin], ProductController.deleteProduct)
module.exports = router