const auth = require('../common/auth');
const prodService = require('../services/product');

const Group = 'product';
const GroupName = '产品';
const V1 = `/api/v1/${Group}`;

const indexList = (list) => {
    const indexes = {}
    list.forEach(item => {
        const i = item.initial[0];

        if (!indexes.hasOwnProperty(i)) {
            indexes[i] = {
                title: i,
                key: i,
                items: []
            }
        }
        indexes[i].items.push({
            id: item.id,
            name: `${item['brand.name']} ${item.name} ${item.model}`
        });
    });

    return Object.values(indexes);
};

module.exports = [
    {
        method: 'GET',
        path: V1,
        handler: async (request, reply) => {
            const query = request.query;
            const index = query.index;
            delete query.index;

            let data = await prodService.list({ where: query, raw: true });
            if (index == 1) {
                data = indexList(data);
            }
            reply(data);
        },
        config: {
            tags: ['api', GroupName],
            description: '产品列表',
            validate: {
                ...auth.headerValidate
            }
        }
    },
    {
        method: 'GET',
        path: `${V1}/{pk}`,
        handler: async (request, reply) => {
            const data = await prodService.detail(request.params.pk);
            reply(data);
        },
        config: {
            tags: ['api', GroupName],
            description: '产品详情',
            validate: {
                ...auth.headerValidate
            }
        }
    },
    {
        method: 'GET',
        path: `${V1}/model`,
        handler: async (request, reply) => {
            const { brand_id, category_id } = request.payload;
            const data = await prodService.models({ brand_id, category_id });
            reply(data)
        },
        config: {
            tags: ['api', GroupName],
            description: '产品型号列表',
            validate: {
                ...auth.headerValidate
            }
        }
    },
    {
        method: 'GET',
        path: `${V1}/sn`,
        handler: async (request, reply) => {
            const { brand_id, category_id, model } = request.payload;
            const data = await prodService.sns({ brand_id, category_id, model });
            reply(data)
        },
        config: {
            tags: ['api', GroupName],
            description: '产品序列号列表',
            validate: {
                ...auth.headerValidate
            }
        }
    },
]