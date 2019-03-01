const models = require('../models');

module.exports = {
    list: async (options = {}) => {
        let $where = { isShow: true };
        options.where = Object.assign(options.where || {}, $where);
        return await models.brand.findAll(options);
    }
};