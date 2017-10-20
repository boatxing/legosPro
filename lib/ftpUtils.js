/**
 * Created by user on 2017/10/15.
 */
const ftpClient = require('ssh2-sftp-client');
const ftpConfig = require("../config").ftp;
const Promise = require("promise");
const log = require("./log").logger("ftpUtils");

/**
 * 上传文件
 * @param src 本地文件
 * @param target 服务器file path
 * @returns {boolean}
 */
module.exports.put = function(src, target){
    log.info("ftp put", src, target);
    return new Promise((resolve, reject) => {
            let c = new ftpClient();
            // c.on('ready', function() {
            //     log.info("ready");
            //     c.sftp(function(err, sftp){
            //         if(err){
            //             reject({
            //                 code: 1,
            //                 message: `上传文件失败，返回码：${err.code}`
            //             });
            //             c.end();
            //         }else{
            //             sftp.fastPut(src, target, function(err, result){
            //                 c.end();
            //                 log.info("sftp complete", err, result);
            //                 resolve(err, result);
            //             });
            //         }
            //     });
            // });
            c.connect(ftpConfig).then(() => {
                c.put(src, target).then(resolve).catch((err)=> {
                    log.info("sftp fail", err);
                })
            }).catch((e)=>{
                log.error("connect fail ", e);
            })
    });

}