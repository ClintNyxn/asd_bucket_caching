const express = require('express')
const router = express.Router()

const {getProduct,getId,createProduct,updateProduct,patchProduct,deleteProduct} = require('../controllers/productsController.js')
const productsMiddleware = require('../middleware/productsMiddleware.js')

router.get('/', productsMiddleware ,getProduct)
router.get('/:id', productsMiddleware ,getId)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.patch('/:id', patchProduct)
router.delete('/:id', deleteProduct)

module.exports = router
