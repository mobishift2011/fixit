const { format } = require('date-fns')
const Op = require('sequelize').Op;
const models = require('../models');
const prodService = require('./product')

const pad = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

const genNo = async () => {
    const now = new Date();
    const today = format(now, 'YYYY/MM/DD');
    const df = format(now, 'YYYYMMDD');
    const count = await models.orders.count({
        where: {
            created_at: {
                [Op.gte]: today
            }
        }
    });
    const no = `${df}${pad(count + 1, 3)}`;
    return no
}

module.exports = {
    list: async (options = {}) => {
        Object.assign(options, {
            include: [
                { model: models.user, as: 'client_user', attributes: ['name'] },
                { model: models.user, as: 'service_user', attributes: ['name'] }
            ]
        })
        return await models.orders.findAll(options);
    },
    detail: async (pk) => {
        const instance = await models.orders.findById(pk, {
            include: [
                { model: models.user, as: 'client_user', attributes: ['name', 'mobile'] },
                { model: models.user, as: 'service_user', attributes: ['name', 'mobile'] }
            ]
        });
        return instance
    },
    submit: async (data = {}) => {
        const product = await prodService.detail(data.product);
        const shop = product.shop;
        const user = data.user;
        const obj = {
            no: await genNo(),
            category: data.category,
            price: product.charge,
            shop_name: shop.name,
            shop_no: shop.no,
            shop_address: shop.address,
            product_id: product.id,
            product_name: product.name,
            product_brand: product.brand && product.brand.name,
            product_category: product.category && product.category.name,
            product_model: product.model,
            product_specification: product.specification,
            product_sn: product.sn,
            appointed_at: data.appointed_at,
            client_user_id: user
        };
        const instance = await models.orders.create(obj);
        return instance;
    },
    assign: async (pk) => {
        const count = await models.orders.update({
            state: 2,
            assigned_at: new Date()
        }, { where: { id: pk } });
        return count > 0;
    },
    arrive: async (pk) => {
        const count = await models.orders.update({
            state: 3,
            arrival_at: new Date()
        }, { where: { id: pk } });
        return count > 0;
    },
    complete: async (pk) => {
        const count = await models.orders.update({
            state: 4,
            complete_at: new Date()
        }, { where: { id: pk } });
        return count > 0;
    },
    confirm: async (pk, data) => {
        data = data || {};
        const kwargs = {
            state: 5,
            confirmed_at: new Date()
        };
        const keys = ['rating', 'comment'];
        keys.forEach(k => {
            if (data.hasOwnProperty(k)) {
                kwargs[k] = data[k]
            }
        });
        const count = await models.orders.update(kwargs, { where: { id: pk } });
        return count > 0;
    },
    rate: async (pk, data) => {
        data = data || {};
        const kwargs = {};
        const keys = ['rating', 'comment'];
        keys.forEach(k => {
            if (data.hasOwnProperty(k)) {
                kwargs[k] = data[k]
            }
        });
        const count = await models.orders.update(kwargs, { where: { id: pk } });
        return count > 0;
    }
};