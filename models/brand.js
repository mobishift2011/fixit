'use strict';
module.exports = (sequelize, Types) => {
  const brand = sequelize.define(
    'brand',
    {
      name: {
        type: Types.STRING,
        allowNull: false
      },
      logo: Types.STRING,
      desc: Types.STRING,
      site: Types.STRING,
      sort: {
        type: Types.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isShow: {
        type: Types.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_show'
      }
    },
    {
      tableName: 'brand'
    }
  );
  brand.associate = function (models) {
    // associations can be defined here
  };
  return brand;
};