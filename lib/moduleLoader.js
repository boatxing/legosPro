/**
 * Created by boatxing on 2017/10/15.
 * 模块加载器
 */
const legosUtils = require("./legosUtils");

/**
 * 根据入口js，拉取入口依赖的所有module到临时目录（build目录），并修改每个组件的require path为./xxx.js
 * @param enter 入口moduleName
 */
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