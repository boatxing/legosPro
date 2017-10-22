/**
 * Created by boatxing on 2017/10/15.
 */
const ftpClient = require('ssh2-sftp-client');
const ftpConfig = require("../config").ftp;
const log = require("./log").logger("ftpUtils");
const path = require("path");

/**
 * 上传文件
 * @param src 本地文件
 * @param target 服务器file path
 * @returns {code: 0, message: ''} 非0失败
 */
module.exports.put = function(src, target){
    log.info("ftp put", src, target);
    return new Promise((resolve, reject) => {
            let c = new ftpClient();
            c.connect(ftpConfig).then(() => {
                let targetPath = path.parse(target);
                if(!targetPath.base || !/\.\w*$/.test(targetPath.base)){
                    c.end();
                    reject({
                        code: 1,
                        message: `${target}不是一个文件`
                    });
                    return false;
                }
                log.info("target dir:", targetPath.dir);
                c.mkdir(targetPath.dir, true).then(()=>{
                    c.put(src, target).then(() => {
                        c.end();
                        resolve({
                            code: 0,
                            message: `put${target}成功`
                        })
                    }).catch((err)=> {
                        c.end();
                        log.info("sftp fail", err);
                        reject({
                            code: err.code,
                            message: `put${target}失败，请检查服务器目录权限，${err.code}`
                        })
                    })
                }).catch((err) => {
                    log.error(`创建目录${targetPath.dir}失败`, err.code);
                    c.end();
                    reject({
                        code: 1,
                        message: `创建目录${targetPath.dir}失败，${err.code}`
                    })
                })
            }).catch((e)=>{
                c.end();
                log.error("connect fail ", e);
                reject({
                    code: 1,
                    message: `连接${ftpConfig.host}失败`
                })

            });
    });
}
