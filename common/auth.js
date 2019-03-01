const Bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('../config');
const models = require('../models')

module.exports.headerValidate = {
    headers: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}

module.exports.authenticate = async (username, password) => {
    const user = await models.user.findOne({ where: { username: username } });
    if (!user) {
        return null
    }
    const isValid = await Bcrypt.compare(password, user.password);
    return isValid ? user : null;
}

module.exports.signIn = (userId) => {
    const payload = {
        u: userId,
        exp: Math.floor(new Date().getTime() / 1000) + 3600 * 24 * 1
    };
    return jwt.sign(payload, config.secret);
}