'use strict';
const enums = require('../common/enums');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      avatar: DataTypes.STRING,
      gender: {
        type: DataTypes.INTEGER,
        validate: {
          isIn: [Object.keys(enums.genderChoices)]
        }
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isIn: [Object.keys(enums.userStateChoices)]
        }
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isIn: [Object.keys(enums.userRoleChoices)]
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_admin'
      },
      lastLogin: {
        type: DataTypes.DATE,
        field: 'last_login'
      }
    },
    {
      tableName: 'user'
    }
  );
  user.associate = function (models) { };
  return user;
};