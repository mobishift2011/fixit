'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop', {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no: Sequelize.STRING,
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: Sequelize.STRING,
      mobile: Sequelize.STRING,
      tax: Sequelize.STRING,
      email: Sequelize.STRING,
      manager: Sequelize.STRING,
      opened_at: Sequelize.DATE,
      closed_at: Sequelize.DATE,
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
    return queryInterface.dropTable('shop');
  }
};