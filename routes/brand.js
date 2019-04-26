const Op = require('sequelize').Op;
const auth = require('../common/auth');
const prodService = require('../services/product');
const brandService = require('../services/brand');

const Group = 'brand';
const GroupName = '品牌';
const V1 = `/api/v1/${Group}`;

module.exports = [
    {
        method: 'GET',
        path: V1,
        handler: async (request, reply) => {
            const user = request.auth.credentials
            const prods = await prodService.list({ where: { shop_id: user.shop_id } })
            const brandIds = prods.map(e => e.brand_id);
            const data = brandService.list({
                where: {
                    id: {
                        [Op.in]: brandIds
                    }
                }
            });
            reply(data);
        },
        config: {
            tags: ['api', GroupName],
            description: "品牌列表",
            validate: {
                ...auth.headerValidate
            }
        }
    },
];