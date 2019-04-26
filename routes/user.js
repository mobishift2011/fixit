const Boom = require('boom');
const Joi = require('joi');
const auth = require('../common/auth');
const userService = require('../services/user');

const Group = 'user'
const GroupName = '用户'
const V1 = `/api/v1/${Group}`

module.exports = [
    {
        method: 'POST',
        path: `${V1}/login`,
        handler: async (request, reply) => {
            const { username, password } = request.payload;
            const user = await auth.authenticate(username, password);
            if (!user) {
                return reply(Boom.badRequest('用户名或密码错误'))
            }
            const token = auth.signIn(user.id);
            const profile = await userService.profile(user.id);
            reply({
                token: token,
                profile: profile.get({ plain: true })
            });
        },
        config: {
            tags: ['api', GroupName],
            description: '登录',
            auth: false,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: `${V1}/profile`,
        handler: (request, reply) => {
            reply(request.auth.credentials)
        },
        config: {
            tags: ['api', GroupName],
            description: '用户资料',
            validate: {
                ...auth.headerValidate
            }
        }
    }
];