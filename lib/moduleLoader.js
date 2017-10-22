/**
 * Created by boatxing on 2017/10/15.
 * 模块加载器
 */
const legosUtils = require("./legosUtils");

function loadEnter(enter){

}

/**
 * 从legos数据库加载一个组件
 * @param moduleName 组件名称
 * @return {id: , code: , deps: ''}
 */
function loadModule(moduleName){
    log.info("loadModule", moduleName);
    legosUtils.query(moduleName).then(({id, code, deps}) => {

    }).catch(() => {

    })
}

module.exports.loadEnter = loadEnter;