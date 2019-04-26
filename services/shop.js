const models = require('../models');

module.exports = {
    list: async (options = {}) => {
        let $where = { isDeleted: false };
        options.where = Object.assign(options.where || {}, $where);
        return await models.shop.findAll(options);
    }
};