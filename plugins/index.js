module.exports = [
    ...require('./swagger'),
    require('hapi-auth-jwt2'),
    require('./goods')
];