'use strict';
const db = require('../models');
const { BadRequestError } = require('../core/error.response');

class UserService {
    static create = async ({ username, email, hash_password }) => {
        const user = await db.User.create({ 
            username,
            email,
            hash_password
        });
        if(!user) {
            throw new BadRequestError('Failed to create user! Something went wrong! Please try again!');
        }
        return user;
    }

    static get_all = async () => {
        const users = await db.User.findAll({ raw: true });
        return users;
    }

    static update = async ( id, { username, email, hash_password }) => {
        if (!role_id) throw new BadRequestError('role id not found');
        const user = await db.User.update({ 
            username, 
            email, 
            hash_password
        }, {
            where: { id }
        });
        if(!user) throw new BadRequestError('failed to update user');
        return user;
    }

    static delete = async ( id ) => {
        const user = await db.User.destroy({
            where: { id }
        });
        if(!user) throw new BadRequestError('failed to delete user');
        return user;
    }

    static getUserDetails = async (user_id) => {
        const user = await db.User.findOne({
            where: {
                id: user_id
            },
            attributes: ['id', 'username', 'email'],
            raw: true
        });
        if (!user) throw new BadRequestError('User not found');
        return user;
    }
}

module.exports = UserService;