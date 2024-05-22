/**
 * 环境配置
 */
export const ENV_CONFIG = {
  DBConfig: {
    path: '/data/db.db',
  },
  loggerConfig: {},
  crashReporterConfig: {
    companyName: '33',
    productName: 'electron-vite-react-antd',
    submitURL: 'https://your-domain.com/url-to-submit',
    uploadToServer: false, // 不发送崩溃日志到服务器
    compress: true,
  },
};
