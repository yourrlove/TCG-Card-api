'use strict';
const db = require('../models');
const { BadRequestError } = require('../core/error.response');
const cloudinary = require('../configs/config.cloudinary');
const { Sequelize } = require('sequelize');
const { Op }       = Sequelize;

class CardService {
    static create = async ({ 
        name,
        code,
        type,
        rarity,
        series,
     }, image) => {
        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'cards',
            public_id: name
        });

        const card = await db.Card.create({ 
            name,
            code,
            image_url : uploadResponse.secure_url,
            type,
            rarity,
            series,
        });

        if(!card) {
            throw new BadRequestError('Failed to create card! Something went wrong! Please try again!');
        }
        return card;
    }

    static get_all = async (filters) => {
        const {
            keyword,
            rarity,
        } = filters;
        const where = {};
        if (keyword) {
            where[db.Sequelize.Op.or] = [
            { name: { [db.Sequelize.Op.like]: `%${keyword}%` } },
            { code: { [db.Sequelize.Op.like]: `%${keyword}%` } }
            ];
        }
        if (rarity) {
            where.rarity = {
                [db.Sequelize.Op.like]: `%${rarity}%`
            };
        }
        const users = await db.Card.findAll({ where, raw: true });
        return users;
    }

    static update = async ( id, { 
        name,
        description,
        image_url,
        type,
        rarity,
        image_vector,
        series
     }) => {
        const card = await db.Card.update({ 
            name, 
            description, 
            image_url, 
            type, 
            rarity, 
            image_vector,
            series
        }, {
            where: { id }
        });
        if(!card) throw new BadRequestError('failed to update card');
        return card;
    }

    static delete = async ( id ) => {
        const card = await db.Card.destroy({
            where: { id }
        });
        if(!card) throw new BadRequestError('failed to delete card');
        return card;
    }

    static getCardDetails = async (id) => {
        const card = await db.Card.findOne({
            where: {
                id: id
            },
            raw: true
        });
        if (!card) throw new BadRequestError('Card not found');
        return card;
    }

    static getRandomCardsBySeries = async (series) => {
        // get 9 random cards from the same series with rarity 'Common'
        let cards = [];
        const commonRarity = 'Common';
        const commonCards = await db.Card.findAll({
            where: {
                series: series,
                rarity: commonRarity
            },
            order: db.Sequelize.literal('RAND()'),
            limit: 9,
            raw: true
        });

        // get 1 random cards from the same series. guarantees a Rare card
        const hitRate = Math.random() < 0.2; // 20% chance to get a rare card
        const rareRarity = hitRate ? 'Rare' : 'Common';
        const rareCard = await db.Card.findOne({
            where: {
                series: series,
                rarity: rareRarity
            },
            order: Sequelize.literal('RAND()'),
            raw: true
        });

        cards = [...commonCards, rareCard];
        return cards;
    }
}

module.exports = CardService;