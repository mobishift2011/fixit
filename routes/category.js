const Op = require('sequelize').Op;
const auth = require('../common/auth');
const prodService = require('../services/product');
const models = require('../models') // TODO replace by category service

const Group = 'category';
const GroupName = '分类';
const V1 = `/api/v1/${Group}`;

module.exports = [
    {
        method: 'GET',
        path: V1,
        handler: async (request, reply) => {
            const user = request.auth.credentials
            const prods = await prodService.list({
                where: {
                    shop_id: user.shop_id,
                    brand_id: request.query.brand_id
                }
            })
            const categoryIds = prods.map(e => e.category_id);
            const categories = await models.category.findAll({
                where: {
                    id: {
                        [Op.in]: categoryIds
                    }
                },
                order: ['sort']
            });
            reply(categories);
        },
        config: {
            tags: ['api', GroupName],
            description: "分类列表",
            validate: {
                ...auth.headerValidate
            }
        }
    },
];