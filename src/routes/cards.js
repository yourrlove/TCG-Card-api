const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card.controller');

const { asyncHandler } = require('../helpers/index');
const { uploadDisk } = require('../configs/config.multer');

router.put('/:id', asyncHandler( cardController.update_card ));
router.post('/', uploadDisk.single("image"), asyncHandler( cardController.create_card ));
router.get('/', asyncHandler( cardController.get_list_cards ));
router.get('/:id', asyncHandler( cardController.get_card ));
router.delete('/:id', asyncHandler( cardController.delete_card ));

module.exports = router;
