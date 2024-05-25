// By default, it writes logs to the following locations:
// on Linux: ~/.config/{app name}/logs/main.log
// on macOS: ~/Library/Logs/{app name}/main.log
// on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\main.log

import * as logger from 'electron-log';
import path from 'path';

function setLogger() {
  // logger.transports.file.fileName = '/Evra/log.log';
  logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] [main] {text}';
  logger.transports.file.level = process.env.NODE_ENV === 'development' ? 'silly' : 'verbose';
  logger.transports.file.resolvePathFn = () => path.resolve(process.cwd(), './logs/log.log');
  logger.initialize();
}

setLogger();

export default logger;
