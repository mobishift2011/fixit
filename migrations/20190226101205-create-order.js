'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
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
      no: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      shop_name: Sequelize.STRING,
      shop_no: Sequelize.STRING,
      shop_address: Sequelize.STRING,
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_brand: Sequelize.STRING,
      product_category: Sequelize.STRING,
      product_model: Sequelize.STRING,
      product_specification: Sequelize.STRING,
      product_sn: Sequelize.STRING,
      assigned_at: Sequelize.DATE,
      appointed_at: Sequelize.DATE,
      arrival_at: Sequelize.DATE,
      complete_at: Sequelize.DATE,
      confirmed_at: Sequelize.DATE,
      rating: Sequelize.INTEGER,
      comment: Sequelize.STRING,
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'id'
        }
      },
      client_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      service_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};