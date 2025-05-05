'use strict';
const db = require('../models');
const { BadRequestError } = require('../core/error.response');

class CollectionService {
    static create = async ({ 
        user_id,
        card_id,
     }) => {
        // Check if the collection already exists
        const existingCollection = await db.Collection.findOne({ 
            where: { user_id, card_id } 
        });
        
        //if it exists, update quantity
        if (existingCollection) {
            existingCollection.quantity += 1;
            await existingCollection.save();
            return existingCollection;
        }

        // If it doesn't exist, create a new collection
        const collection = await db.Collection.create({ 
            user_id,
            card_id
        });
        if(!collection) {
            throw new BadRequestError('Failed to create collection! Something went wrong! Please try again!');
        }
        return collection;
    }

    static get_all = async () => {
        const collections = await db.Collection.findAll({ raw: true });
        return collections;
    }

    static get_user_collection = async (user_id) => {
        const collections = await db.Collection.findAll({ 
            where: { user_id },
            raw: true
        });
        return collections;
    }

    static delete = async (user_id, card_id) => {
        const collection = await db.Collection.destroy(
            {
                where: { user_id, card_id }
            }
        );
        if(!collection) throw new BadRequestError('failed to delete collection');
        return collection;
    }
}

module.exports = CollectionService;