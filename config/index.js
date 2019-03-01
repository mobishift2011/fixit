let path = './.env';
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv) {
    path = `${path}.${nodeEnv}`;
}
require('env2')(path);
const { env } = process;

module.exports = {
    host: env.HOST,
    port: env.PORT,
    secret: env.SECRET
}