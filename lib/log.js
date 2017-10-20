const path = require("path");
const log4js = require("log4js");
let isConfig = 0;

/**
 * 暴露到应用的日志接口，调用该方法前必须确保已经configure过
 * @param name 指定log4js配置文件中的category。依此找到对应的appender。
 *              如果appender没有写上category，则为默认的category。可以有多个
 * @returns {Logger}
 */
exports.logger = function(name) {
    if(!isConfig) configure();
    let dateFileLog = log4js.getLogger(name);
    return dateFileLog;
}

/**
 * 日志配置
 */

function configure() {
    log4js.configure(path.join(__dirname + "/log4js.json"));
    isConfig = 1;
}
