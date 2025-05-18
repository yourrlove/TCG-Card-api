const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth');
const { asyncHandler } = require('../helpers/index');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userid:
 *           type: string
 *           example: "u12345"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john@example.com"
 */

/**
 * @swagger
 * /v1/api/users:
 *   get:
 *     summary: Get list of users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', asyncHandler(userController.get_list_users));

/**
 * @swagger
 * /v1/api/users/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/me', verifyToken, asyncHandler(userController.get_current_user));

module.exports = router;
