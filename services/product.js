const models = require('../models');
const Op = require('sequelize').Op;

module.exports = {
    list: async (options = {}) => {
        let $where = { is_deleted: false };
        options.where = options.where || {};
        Object.assign(options.where, $where);
        Object.assign(options, {
            include: [
                { model: models.brand },
                { model: models.category }
            ]
        });
        return await models.product.findAll(options);
    },
    detail: async (pk) => {
        return await models.product.findById(pk, {
            include: [
                { model: models.brand },
                { model: models.category },
                { model: models.shop }
            ]
        });
    },
    models: async (options = {}) => {
        const $where = { model: { [Op.ne]: null } };
        options = Object.assign(options || {}, {
            where: Object.assign($where, options.where || {}),
            attributes: ['model'],
            group: 'model',
            raw: true
        });
        const result = await models.product.findAll(options);
        return result.map(e => e.model);
    },
    sns: async (options = {}) => {
        const $where = { sn: { [Op.ne]: null } };
        options = Object.assign(options || {}, {
            where: Object.assign($where, options.where || {}),
            attributes: ['sn'],
            group: 'sn',
            raw: true
        });
        const result = await models.product.findAll(options);
        return result.map(e => e.sn);
    }
};