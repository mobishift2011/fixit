'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: Sequelize.DATE,
      shop_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shop',
          key: 'id'
        }
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'brand',
          key: 'id'
        }
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      initial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no: Sequelize.STRING,
      price: Sequelize.DECIMAL(10, 2),
      charge: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      desc: Sequelize.STRING,
      thumb: Sequelize.STRING,
      img: Sequelize.STRING,
      model: Sequelize.STRING,
      specification: Sequelize.STRING,
      sn: {
        type: Sequelize.STRING,
        unique: true
      },
      manufacturer: Sequelize.STRING,
      supplier: Sequelize.STRING,
      warranty: Sequelize.INTEGER.UNSIGNED,
      installed_at: Sequelize.DATE,
      sort: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product');
  }
};