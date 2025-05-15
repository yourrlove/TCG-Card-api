'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      // define association here
      Card.hasMany(models.Collection, {
        foreignKey: 'card_id',
        as: 'collections'
      });
    }
  }
  Card.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_vector: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Card',
    tableName: 'cards',
    timestamps: true
  });
  return Card;
};