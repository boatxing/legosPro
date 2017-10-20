/**
 * Created by user on 2017/10/15.
 */
const ftpClient = require('ssh2').Client;
const ftpConfig = require("../config").ftp;
const Promise = require("promise");
//const log = require("log").logger("ftpUtils");

/**
 * 上传文件
 * @param src 本地文件
 * @param target 服务器file path
 * @returns {boolean}
 */
module.exports.put = function(src, target){
    //log.info("ftp put", src, target);
    return new Promise((resolve, reject) => {
            let c = new ftpClient();
            c.on('ready', function() {
                console.log("===ready");
                c.put(src, target, (err) => {
                    console.log("=======", err);
                    if (err) {
                        c.end();
                        //log.error(err);
                        reject({
                            code: 1,
                            message: `上传文件失败，返回码：${err.code}`
                        });
                        return false;
                    }
                    c.end();
                    resolve({code: 0});
                });
            });
            console.log("connect", ftpConfig);
            c.connect(ftpConfig);
    });

}