'use strict';
const enums = require('../common/enums');

module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    'orders',
    {
      no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.keys(enums.orderCategoryChoices)]
        }
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          isIn: [Object.keys(enums.orderStateChoices)]
        }
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      shop_name: DataTypes.STRING,
      shop_no: DataTypes.STRING,
      shop_address: DataTypes.STRING,
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      product_brand: DataTypes.STRING,
      product_category: DataTypes.STRING,
      product_model: DataTypes.STRING,
      product_specification: DataTypes.STRING,
      product_sn: DataTypes.STRING,
      appointed_at: DataTypes.DATE,
      assigned_at: DataTypes.DATE,
      arrival_at: DataTypes.DATE,
      complete_at: DataTypes.DATE,
      confirmed_at: DataTypes.DATE,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING
    },
    {
      tableName: 'orders',
      getterMethods: {
        is_complete() {
          return this.state >= 4
        },
        is_confirmed() {
          return this.state >= 5
        }
      }
    }
  );
  order.associate = function (models) {
    order.belongsTo(models.product)
    order.belongsTo(models.user, { as: 'client_user' });
    order.belongsTo(models.user, { as: 'service_user' });
  };
  return order;
};