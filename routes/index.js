const brandRoutes = require('./brand')
const categoryRoutes = require('./category')
const productRoutes = require('./product')
const userRoutes = require('./user')
const orderRouts = require('./order')

module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply('hello fixit');
        },
    },
    ...brandRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...userRoutes,
    ...orderRouts
]