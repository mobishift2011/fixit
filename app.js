const Hapi = require('hapi');
const config = require('./config');
const routes = require("./routes");
const response = require('./common/response')
const plugins = require("./plugins");

const server = new Hapi.Server({
  debug: { 'request': ['error', 'uncaught'] }
});
// 配置服务器启动 host 与端口
server.connection({
  port: config.port,
  host: config.host,
});

const init = async () => {
  server.route([
    ...routes
  ]);
  // 挂载插件配置
  await server.register(plugins);
  require('./plugins/auth-jwt2')(server);
  server.ext('onPreResponse', response)
  // 启动服务
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server running at: ${server.info.uri}`);
};

init();

module.exports = server;