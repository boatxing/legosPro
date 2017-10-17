/**
 * Created by user on 2017/10/15.
 *
 */
const dbpool = require("./dbpool");
const Promise = require("promise");

const log = require("./log").logger("legosUtils");

/**
 * 向legos中添加一个module
 * @param moduleName
 * @param pPath projectpath
 * @param content module文件内容
 * @param desc  描述
 * @param deps 依赖的module zepto;loadJs;ajax
 */
function addModule(moduleName, pPath, content, desc, deps){
    log.info("addModule", moduleName, pPath, desc, deps);
    log.debug("content:", content);
    let querySql = "select id from tbl_package where name = ?";
    let updateSql = "update tbl_package set ? where name = ?";
    let insertSql = "insert into tbl_package set ?";
    return new Promise((resolve, reject) => {
        pool.query(sql, ["%" + params.name + "%","%" + params.url + "%"], function(err, data){
                if(err){
                    logger.error("查询失败", err);
                    reject(err);
                    return false;
                }
                if(data.length){
                    logger.info("已经存在");
                    callback && callback(err, 1);
                    return true;
                }
                query = pool.query("insert into unitcgis set ?",params, function(err, result){
                    if(err){
                        logger.error("创建接口失败", err);
                        callback && callback(err);
                        return false;
                    }
                    callback && callback(err, result);
                });
                logger.info("sql", query.sqlstr);
            })
    })
}

/**
 * 判断组件是否已经存在
 * @param moduleName
 */
function isExist(moduleName){

}

function query(moduleName){

}

function addProject(pName, jspath){

}

