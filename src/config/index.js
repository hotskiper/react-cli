/**
 * 配置文件
 */

const config = {
  // 请求服务地址
  serverAddr: process.env.NODE_ENV === 'development'
    ? 'http://10.0.200.45:8080/zero' : '/',
  baseUrl: window.location.origin
};
export default config;
