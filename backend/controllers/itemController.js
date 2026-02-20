import Item from '../models/itemModel.js'

// @desc    Get all items
// @route   GET /api/items
// @access  Private
export const getItems = async (req, res, next) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Private
export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      })
    }

    // Check if user is owner or admin
    if (item.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this item'
      })
    }

    res.status(200).json({
      success: true,
      data: item
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create item
// @route   POST /api/items
// @access  Private/Admin
export const createItem = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id

    const item = await Item.create(req.body)

    res.status(201).json({
      success: true,
      data: item
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private/Admin
export const updateItem = async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      })
    }

    // Only admin can update 
    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      success: true,
      data: item
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private/Admin
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      })
    }

    // Only admin can delete 
    await item.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
      data: {}
    })
  } catch (error) {
    next(error)
  }
}