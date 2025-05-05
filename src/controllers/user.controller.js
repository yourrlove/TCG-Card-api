'use strict';

const { OK } = require('../core/success.response');
const UserService = require('../services/user.service');

class UserController {
    get_list_users = async (req, res, next) => {
        new OK({
            message: 'Users retrieved successfully',
            metadata: await UserService.get_all()
        }).send(res);
    }

    update_user = async (req, res, next) => {
        new OK({
            message: 'Users updated successfully',
            metadata: await UserService.update(req.params.id, req.body)
        }).send(res);
    }

    delete_user = async (req, res, next) => {
        new OK({
            message: 'Users deleted successfully',
            metadata: await UserService.delete(req.params.id)
        }).send(res);
    }

    get_current_user = async (req, res, next) => {
        new OK({
            message: 'User retrieved successfully',
            metadata: await UserService.get_basic_infor(req.user.user_id)
        }).send(res);
    }
}

module.exports = new UserController();