'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    'product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      initial: {
        type: DataTypes.STRING,
        allowNull: false
      },
      no: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      charge: {
        type: DataTypes.DECIMAL(10, 2), // 服务收费
        allowNull: false,
        defaultValue: 0
      },
      desc: DataTypes.STRING,
      thumb: DataTypes.STRING,
      img: DataTypes.STRING,
      model: DataTypes.STRING,
      specification: DataTypes.STRING,
      sn: {
        type: DataTypes.STRING,
        unique: true
      },
      manufacturer: DataTypes.STRING,
      supplier: DataTypes.STRING,
      warranty: DataTypes.INTEGER.UNSIGNED, // 保固期(月)
      installed_at: DataTypes.DATE,
      warranty_repair_at: DataTypes.DATE,
      warranty_maintenance_at: DataTypes.DATE,
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
      tableName: 'product',
      paranoid: true,
      underscoredAll: true
    }
  );
  product.associate = function (models) {
    product.belongsTo(models.shop);
    product.belongsTo(models.brand);
    product.belongsTo(models.category);
  };
  return product;
};