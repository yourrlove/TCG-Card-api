const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection.controller');

const { asyncHandler } = require('../helpers/index');

router.post('/', asyncHandler(collectionController.add_to_collection));
router.get('/users/:user_id', asyncHandler(collectionController.get_user_collection));
router.delete('/users/:user_id/cards/:card_id', asyncHandler(collectionController.remove_from_collection));

module.exports = router;