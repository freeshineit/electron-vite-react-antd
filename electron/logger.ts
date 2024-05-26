// By default, it writes logs to the following locations:
// on Linux: ~/.config/{app name}/logs/main.log
// on macOS: ~/Library/Logs/{app name}/main.log
// on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\main.log

import * as logger from 'electron-log';
import path from 'path';
import { isDevelopment } from './utils';
import { ENV_CONFIG } from './env_config';

function setLogger() {
  logger.transports.file.fileName = ENV_CONFIG.loggerConfig.fileName;
  logger.transports.file.format = ENV_CONFIG.loggerConfig.format;
  if (isDevelopment) {
    logger.transports.file.level = process.env.NODE_ENV === 'development' ? 'silly' : 'verbose';
    logger.transports.file.resolvePathFn = () => path.resolve(process.cwd(), './logs/log.log');
  }

  logger.initialize();
}

setLogger();

export default logger;
