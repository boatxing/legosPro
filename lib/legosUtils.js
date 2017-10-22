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
 * @param codePath /export/wxsq/resource/js/legos/public/cookie.js
 * @param codeSrc http://wq.360buyimg.com/js/legos/public/cookie.js
 * @param targetPath /export/wxsq/resource/js/version/201608/cookie.201608231921.js
 * @param targetSrc http://wq.360buyimg.com/js/version/201710/wg.market.shopFavList.201710111510.js
 * @param type 1 module 2 前端模板
 *
 */
function addModule({moduleName, pPath, content, desc, deps, codePath, codeSrc, targetPath, targetSrc, type}){
    log.info("addModule", data.moduleName, data.pPath, data.desc, data.deps);
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
        src: "",
        targetSrc: "",
        lastmodify: new Date(),
        codepath: "",
        useCache: 0,
        type: 1,
        tplSource: '',
        tplPath: ''
    };
    if(type == 2){
        moduleData.tplPath = codePath;
        moduleData.tplSource = codeSrc;
        moduleData.type = 2;
    }else{
        moduleData.type = 1;
        moduleData.src = codePath;
        moduleData.targetSrc = codeSrc;
    }
    log.debug("content:", content);
    return new Promise((resolve, reject) => {
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
                    resolve(err, data);
                })
            }else{ //已经存在不能add
                reject({
                    code: 1,
                    message: `${moduleName}已经存在不能添加`
                })
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

/**
 * 判断组件是否已经存在
 * @param moduleName
 */
function isExist(moduleName){
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
 * 添加一个project
 * @param pName
 * @param jspath
 */
function addProject(pName, jspath){

}

