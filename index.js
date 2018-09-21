const fs = require('fs');
const path = require('path');
const simpleLogger = require('simple-node-logger');

const logFileLocation = './results/logs/';
const projectLogFileNameAndType = 'ProjectLog.log';

function createLogFile(platform, logType, testName) {
  !fs.existsSync(logFileLocation) && fs.mkdirSync(logFileLocation);
  const date = `_${new Date().toLocaleString()}`;
  const fileName = `${platform}_${testName.concat(date)}`;
  const logCatlocation = path.join(__dirname, logFileLocation, fileName);
  fs.writeFile(logCatlocation, JSON.stringify(logType), (err) => {
    if (err) {
      this.projectLog(err, 'error');
      return;
    }
    this.projectLog(`${platform} file created in '/results/logs' folder`);
  });
}

function projectLog(logMsg, level = 'info') {
  !fs.existsSync(logFileLocation) && fs.mkdirSync(logFileLocation);
  const proLoglocation = path.join(__dirname, logFileLocation, projectLogFileNameAndType);
  const log = simpleLogger.createSimpleLogger(proLoglocation);
  if (level === 'info') {
    log.info(logMsg);
  } else if (level === 'error') {
    log.error(logMsg);
  } else if (level === 'warn') {
    log.warn(logMsg);
  }
}
module.exports = {
  createLogFile,
  projectLog,
};
