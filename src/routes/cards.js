const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card.controller');
const { asyncHandler } = require('../helpers/index');
const { uploadDisk } = require('../configs/config.multer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123"
 *         name:
 *           type: string
 *           example: "Dark Magician"
 *         code:
 *           type: string
 *           example: "DMG-001"
 *         type:
 *           type: string
 *           example: "Monster"
 *         rarity:
 *           type: string
 *           example: "Super Rare"
 *         imageUrl:
 *           type: string
 *           example: "https://example.com/images/card.jpg"
 *     CardCreate:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - type
 *         - rarity
 *         - image
 *       properties:
 *         name:
 *           type: string
 *         code:
 *           type: string
 *         type:
 *           type: string
 *         rarity:
 *           type: string
 *         image:
 *           type: string
 *           format: binary
 *     CardUpdate:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - type
 *         - rarity
 *       properties:
 *         name:
 *           type: string
 *         code:
 *           type: string
 *         type:
 *           type: string
 *         rarity:
 *           type: string
 */

/**
 * @swagger
 * /v1/api/cards:
 *   post:
 *     summary: Create a new card
 *     tags:
 *       - Cards
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CardCreate'
 *     responses:
 *       201:
 *         description: Card created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 */
router.post('/', uploadDisk.single("image"), asyncHandler(cardController.create_card));

/**
 * @swagger
 * /v1/api/cards:
 *   get:
 *     summary: Get a list of cards
 *     tags:
 *       - Cards
 *     responses:
 *       200:
 *         description: List of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.get('/', asyncHandler(cardController.get_list_cards));

/**
 * @swagger
 * /v1/api/cards/{id}:
 *   get:
 *     summary: Get a card by ID
 *     tags:
 *       - Cards
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *     responses:
 *       200:
 *         description: Card data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Card not found
 */
router.get('/:id', asyncHandler(cardController.get_card));

/**
 * @swagger
 * /v1/api/cards/{id}:
 *   put:
 *     summary: Update a card by ID
 *     tags:
 *       - Cards
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CardUpdate'
 *     responses:
 *       200:
 *         description: Card updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Card not found
 */
router.put('/:id', asyncHandler(cardController.update_card));

/**
 * @swagger
 * /v1/api/cards/{id}:
 *   delete:
 *     summary: Delete a card by ID
 *     tags:
 *       - Cards
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *     responses:
 *       200:
 *         description: Card deleted successfully
 *       404:
 *         description: Card not found
 */
router.delete('/:id', asyncHandler(cardController.delete_card));

module.exports = router;
