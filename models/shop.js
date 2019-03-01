'use strict';
module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define(
    'shop',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      no: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: DataTypes.STRING,
      mobile: DataTypes.STRING,
      tax: DataTypes.STRING,
      email: DataTypes.STRING,
      manager: DataTypes.STRING,
      openedAt: {
        type: DataTypes.DATE,
        field: 'opened_at'
      },
      closedAt: {
        type: DataTypes.DATE,
        field: 'closed_at'
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_deleted'
      }
    },
    {
      tableName: 'shop',
    }
  );
  shop.associate = function (models) {
  };
  return shop;
};