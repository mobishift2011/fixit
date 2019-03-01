const auth = require('../common/auth');
const brandService = require('../services/brand');

const Group = 'brand';
const GroupName = '品牌';
const V1 = `/api/v1/${Group}`;

module.exports = [
    {
        method: 'GET',
        path: V1,
        handler: (request, reply) => {
            const data = brandService.list();
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