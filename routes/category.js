const auth = require('../common/auth');
const Boom = require('boom');

const Group = 'category';
const GroupName = '分类';
const V1 = `/api/v1/${Group}`;

module.exports = [
    {
        method: 'GET',
        path: V1,
        handler: async (request, reply) => {
            const models = require('../models')
            const categories = await models.category.findAll({
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