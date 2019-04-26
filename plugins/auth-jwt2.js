const config = require('../config');
const userService = require('../services/user');

module.exports = (server) => {
    server.auth.strategy('jwt', 'jwt', {
        key: config.secret,
        validateFunc: async (payload, request, callback) => {
            let error;
            const userId = payload.u;
            if (!userId) {
                return callback(error, false, userId);
            }
            const user = await userService.profile(userId);
            return callback(error, true, user);
        },
    });
    server.auth.default('jwt');
};