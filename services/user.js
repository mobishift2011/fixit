const bcrypt = require('bcrypt');
const config = require('../config');
const models = require('../models');

const profileAttr = ['id', 'name', 'mobile', 'email', 'avatar', 'gender', 'state', 'role', 'last_login', 'shop_id'];

const setPassword = (data) => {
    return bcrypt.hashSync(data, 12);
};

module.exports = {
    findOrCreate: async (username, password, data = {}) => {
        const $where = { username: username };
        const $data = Object.assign(data, { password: setPassword(password) });
        return await models.user.findOrCreate({ where: $where, defaults: $data });
    },
    profile: async (pk) => {
        return await models.user.findById(pk, { attributes: profileAttr });
    },
    setPassword: setPassword
};