const auth = require('../common/auth');
const orderService = require('../services/order');

const Group = 'order';
const GroupName = '订单';
const V1 = `/api/v1/${Group}`;

module.exports = [
    {
        method: 'GET',
        path: V1,
        handler: (request, reply) => {
            const data = orderService.list({
                order: [['created_at', 'DESC']]
            });
            reply(data);
        },
        config: {
            tags: ['api', GroupName],
            description: "订单列表",
            validate: {
                ...auth.headerValidate
            }
        }
    },
    {
        method: 'GET',
        path: `${V1}/{pk}`,
        handler: async (request, reply) => {
            const data = await orderService.detail(request.params.pk);
            reply(data)
        },
        config: {
            tags: ['api', GroupName],
            description: '订单详情',
            validate: {
                ...auth.headerValidate
            }
        }
    },
    {
        method: 'POST',
        path: `${V1}/{pk}/state`,
        handler: async (request, reply) => {
            const pk = request.params.pk
            const action = request.payload['action']
            const result = await orderService[action](pk, request.payload)
            reply(result)
        },
        config: {
            tags: ['api', GroupName],
            description: '订单指派',
            validate: {
                ...auth.headerValidate
            }
        }
    },
    {
        method: 'POST',
        path: `${V1}/{pk}/rating`,
        handler: async (request, reply) => {
            const pk = request.params.pk
            const result = await orderService.rate(pk, request.payload)
            reply(result)
        },
        config: {
            tags: ['api', GroupName],
            description: '订单服务评价',
            validate: {
                ...auth.headerValidate
            }
        }
    },
    {
        method: 'POST',
        path: V1,
        handler: (request, reply) => {
            const data = request.payload;
            data.user = request.auth.credentials.id;
            result = orderService.submit(data);
            reply(result);
        },
        config: {
            tags: ['api', GroupName],
            description: "下订单",
            validate: {
                ...auth.headerValidate
            }
        }
    }
];