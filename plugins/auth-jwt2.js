const config = require('../config');

module.exports = (server) => {
    server.auth.strategy('jwt', 'jwt', {
        key: config.secret,
        validateFunc: (payload, request, callback) => {
            let error;
            const userId = payload.u;
            if (!userId) {
                return callback(error, false, userId);
            }
            const user = {
                id: userId
            };
            return callback(error, true, user);
        },
    });
    server.auth.default('jwt');
};