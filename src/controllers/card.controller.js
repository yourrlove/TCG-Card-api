'use strict';

const { OK, CREATED } = require('../core/success.response');
const CardService = require('../services/card.service');

class CardController {
    create_card = async (req, res, next) => {
        new CREATED({
            message: 'Card created successfully',
            metadata: await CardService.create(req.body)
        }).send(res);
    }

    get_list_cards = async (req, res, next) => {
        new OK({
            message: 'Cards retrieved successfully',
            metadata: await CardService.get_all()
        }).send(res);
    }

    get_card = async (req, res, next) => {
        new OK({
            message: 'Card retrieved successfully',
            metadata: await CardService.getCardDetails(req.params.id)
        }).send(res);
    }

    update_card = async (req, res, next) => {
        new OK({
            message: 'Card updated successfully',
            metadata: await CardService.update(req.params.id, req.body)
        }).send(res);
    }

    delete_card = async (req, res, next) => {
        new OK({
            message: 'Card deleted successfully',
            metadata: await CardService.delete(req.params.id)
        }).send(res);
    }
}

module.exports = new CardController();