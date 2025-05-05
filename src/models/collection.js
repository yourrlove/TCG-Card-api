'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      // define association here
    Collection.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
    });
    Collection.hasMany(models.Card, {
        foreignKey: 'card_id',
        as: 'cards'
    });
    }
  }
  Collection.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
        references: {
            model: 'cards',
            key: 'id'
        }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Collection',
    tableName: 'collections',
    timestamps: false
  });
  return Collection;
};