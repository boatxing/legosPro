/**
 * Created by user on 2017/10/15.
 *
 */
const pool = require("./dbpool");
const Promise = require("promise");

const log = require("./log").logger("legosUtils");

/**
 * 向legos中添加一个module
 * @param moduleName  必须唯一
 * @param pPath projectpath /export/wxsq/resource/js/legos/public 通过pPath查询project id
 * @param content module文件内容
 * @param desc  描述
 * @param deps 依赖的module zepto;loadJs;ajax
 * @param fileSize 文件大小 单位k
 * @param codePath 源文件path /export/wxsq/resource/js/legos/public/cookie.js
 * @param codeSrc 源文件连接 http://wq.360buyimg.com/js/legos/public/cookie.js
 * @param targetPath 编译压缩后的文件路径 /export/wxsq/resource/js/version/201608/cookie.201608231921.js
 * @param targetSrc 编译压缩后的文件连接 http://wq.360buyimg.com/js/version/201710/wg.market.shopFavList.201710111510.js
 * @param type 1 module 2 前端模板
 * @param tplSource 模板源文件内容
 * @param tplPath 模板路径
 */
function addModule({moduleName, pPath, content, desc, deps, codePath, codeSrc, targetPath, targetSrc, type, tplSource, tplPath}){
    log.info("addModule");
    let moduleData = {
        name: moduleName,
        pid: 0,
        title: moduleName,
        desc: desc,
        code: content,
        deps: deps,
        filename: targetPath,
        compressiontype: 1,
        lastversion: '',
        lastupdate: new Date(),
        filesize: 0,
        src: targetSrc,
        targetSrc: codeSrc,
        lastmodify: new Date(),
        codepath: codePath,
        useCache: 0,
        type: 1,
        tplSource: tplSource,
        tplPath: tplPath,
        enableflag: 1,
        babel: 0
    };
    //获取版本号 /export/wxsq/resource/js/version/201608/cookie.201608231921.js
    let lastversion = targetPath.match(/\.(\d+*)\.js$/);
    moduleData.lastversion = lastversion.length ? lastversion[1] : "";
    log.debug("moduleData:", moduleData);
    return new Promise((resolve, reject) => {
        queryProjectId(pPath).then((id) => {
            moduleData.pid = id;
            isExist(moduleName).then((exist) =>{
                if(!exist){ //还不存在该module
                    pool.query("insert into tbl_package set ?", moduleData, (err, data) => {
                        if(err){
                            log.error("insert失败", err);
                            reject({
                                code: 3,
                                message: `添加module失败， ${err.code}`
                            })
                            return false;
                        }
                        resolve(data);
                    })
                }else{ //已经存在不能add
                    reject({
                        code: 1,
                        message: `${moduleName}已经存在不能添加`
                    })
                }
            }).catch(reject);
        }).catch(reject);
    })
}

/**
 * 更新module
 * @param moduleName
 * @param pPath
 * @param content
 * @param desc
 * @param deps
 * @param codePath
 * @param codeSrc
 * @param targetPath
 * @param targetSrc
 * @param type
 * @param tplSource
 * @param tplPath
 */
function updateModule({moduleName, desc, content, deps, targetPath, targetSrc, type, tplSource}) {
    log.info("updateModule", moduleName);
    let moduleData = {
        name: moduleName,
        desc: desc,
        code: content,
        lastversion: '',
        deps: deps,
        filename: targetPath,
        src: targetSrc,
        type: type,
        tplSource: tplSource
    };
    //type=2 html模板
    if(type == 1)delete moduleData.tplSource;
    if(targetPath){
        //获取版本号 /export/wxsq/resource/js/version/201608/cookie.201608231921.js
        let lastversion = targetPath.match(/\.(\d+*)\.js$/);
        moduleData.lastversion = lastversion.length ? lastversion[1] : "";
    }
    for(let i in moduleData){
        if(!moduleData[i]) delete moduleData[i];
    }

    //空对象
    let isEmpty = 1;
    for(let i in moduleData){
        isEmpty = 0;
    }
    if(isEmpty){
        reject({
            code: 2,
            message: '参数不合法，更新内容为空'
        })
        return false;
    }
    log.debug("moduleData:", moduleData);
    return new Promise((resolve, reject) => {
        isExist(moduleName).then((exist) => {
            if(exist){ //已经存在更新
                pool.query("update tbl_package set ? where name = ?", [moduleData, moduleName], (err, data) => {
                    if(err){
                        log.error("update失败", err);
                        reject({
                            code: 3,
                            message: `更新${moduleName}失败， ${err.code}`
                        })
                        return false;
                    }
                    resolve(data);
                })
            }else{ 
                reject({
                    code: 1,
                    message: `请先添加${moduleName}`
                })
            }
        }).catch(reject);
    })
}

/**
 * 判断组件是否已经存在
 * @param moduleName
 */
function isExist(moduleName){
    log.info("isExist", moduleName);
    return new Promise((resolve, reject) => {
        pool.query("select id from tbl_package where name = ?", [moduleName], (err, data) =>{
            if(err){
                log.err(err);
                reject({
                    code: 2,
                    message: `查询${moduleName}是否存在失败，${err.code}`;
                });
                return false;
            }

            resolve(data.length);
        });
    });
}

/**
 * 查询组件内容
 * @param moduleName 组件名称
 * @param {id:, code: ''}  code就是组件内容
 */
function query(moduleName){
    log.info("query", moduleName);
    return new Promise((resolve, reject) => {
        pool.query("select * from tbl_package where name = ?", [moduleName], (err, data) =>{
            if(err){
                log.err(err);
                reject({
                    code: 2,
                    message: `查询${moduleName}失败，${err.code}`;
                });
                return false;
            }

            resolve(data.length ? data[0] : {});
        });
    });
}

/**
 * 通过project path查询id
 * @param pPath project path
 */
function queryProjectId(pPath){
    log.info("queryProjectId", pPath);
    return new Promise((resolve, reject) => {
        pool.query("select * from tbl_project where jspath = ?", [pPath], (err, data) =>{
            if(err){
                log.err(err);
                reject({
                    code: 2,
                    message: `查询${pPath} project信息失败，${err.code}`;
                });
                return false;
            }

            if(!data.length){
                reject({
                    code: 2,
                    message: `通过${pPath}查询projectId为空`
                })
            }

            resolve(data[0].id);
        });
    })
}

/**
 * 添加一个project
 * @param pName
 * @param jspath
 */
function addProject(pName, jspath){

}


module.exports = {
    addModule: addModule()
}
