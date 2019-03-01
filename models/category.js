'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    'category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      desc: DataTypes.STRING,
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      unit: DataTypes.STRING, //measure_unit
      isShow: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_show'
      }
    },
    {
      tableName: 'category'
    }
  );
  category.associate = function (models) {
    category.hasMany(category, { as: 'Children', foreignKey: 'parent_id' })
    category.belongsTo(category, { as: 'parent', foreignKey: 'parent_id' })
  };
  return category;
};