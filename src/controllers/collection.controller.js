'use strict';

const { OK, CREATED } = require('../core/success.response');
const CollectionService = require('../services/collection.service');

class CollectionController {
    add_to_collection = async (req, res, next) => {
        new CREATED({
            message: 'Collection created successfully',
            metadata: await CollectionService.create(req.body)
        }).send(res);
    }

    get_user_collection = async (req, res, next) => {
        new OK({
            message: 'User collections retrieved successfully',
            metadata: await CollectionService.get_user_collection(req.params.user_id)
        }).send(res);
    }

    remove_from_collection = async (req, res, next) => {
        new OK({
            message: 'Collection deleted successfully',
            metadata: await CollectionService.delete(req.params.user_id, req.params.card_id)
        }).send(res);
    }
}

module.exports = new CollectionController();