import express from 'express'
const router = express.Router()
import { protect, authorize } from '../middleware/authMiddleware.js'
import { getItems, getItem, createItem, updateItem, deleteItem } from '../controllers/itemController.js'


router.use(protect)

//public routes
router.get('/', getItems)
router.get('/:id', getItem)


router.post('/', authorize('admin'), createItem)
router.put('/:id', authorize('admin'), updateItem)
router.delete('/:id', authorize('admin'), deleteItem)

export default router