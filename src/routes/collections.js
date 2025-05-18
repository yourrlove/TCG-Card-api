const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collection.controller');

const { asyncHandler } = require('../helpers/index');

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Add a card to a collection
 *     tags:
 *       - Collections
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - card_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "u12345"
 *               card_id:
 *                 type: string
 *                 example: "c67890"
 *     responses:
 *       201:
 *         description: Card added to collection successfully
 */
router.post('/', asyncHandler(collectionController.add_to_collection));

/**
 * @swagger
 * /collections/users/{user_id}:
 *   get:
 *     summary: Get a user's collection
 *     tags:
 *       - Collections
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get collection for
 *     responses:
 *       200:
 *         description: List of cards in user's collection
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   card_id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   code:
 *                     type: string
 *                   type:
 *                     type: string
 *                   rarity:
 *                     type: string
 */
router.get('/users/:user_id', asyncHandler(collectionController.get_user_collection));

/**
 * @swagger
 * /collections/users/{user_id}/cards/{card_id}:
 *   delete:
 *     summary: Remove a card from a user's collection
 *     tags:
 *       - Collections
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: card_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID to remove
 *     responses:
 *       200:
 *         description: Card removed from collection successfully
 *       404:
 *         description: Card or user not found
 */
router.delete('/users/:user_id/cards/:card_id', asyncHandler(collectionController.remove_from_collection));


module.exports = router;