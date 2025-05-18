'use strict';

const express = require('express');
const router = express.Router();
const AuthContoller = require('../controllers/auth.controller');
const { asyncHandler } = require('../helpers/index');

/** POST Methods */
/**
 * @openapi
 * '/v1/api/auth/signup':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe 
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post('/signup', asyncHandler( AuthContoller.signUp ));

/**
 * @openapi
 * '/v1/api/auth/login':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post('/login', asyncHandler( AuthContoller.logIn ));

/**
 * @openapi
 * '/v1/api/auth/logout':
 *  get:
 *     tags:
 *     - Authentication
 *     summary: Logout a user
 *     responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.get('/logout', asyncHandler( AuthContoller.logOut ));

/**
 * @openapi
 * '/v1/api/auth/getaccesstoken':
 *  get:
 *     tags:
 *     - Authentication
 *     summary: Get a new access token using refresh token
 *     responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
router.get('/getaccesstoken', asyncHandler( AuthContoller.handleRefreshToken ));

module.exports = router;