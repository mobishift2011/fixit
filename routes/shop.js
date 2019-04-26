const Op = require('sequelize').Op;
const auth = require('../common/auth');
const shopService = require('../services/shop');

const Group = 'shop';
const GroupName = '店铺';
const V1 = `/api/v1/${Group}`;

module.exports = [
    {
        method: 'GET',
        path: V1,
        handler: async (request, reply) => {
            const user = request.auth.credentials
            const data = shopService.list({
                where: {
                    id: {
                        [Op.in]: [user.shop_id]
                    }
                }
            });
            reply(data);
        },
        config: {
            tags: ['api', GroupName],
            description: "店铺列表",
            validate: {
                ...auth.headerValidate
            }
        }
    },
];