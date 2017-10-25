/**
 * Created by boat on 2017/10/23.
 * 提供添加组件，更新组件功能
 */
const log = require("log").logger("moduleUtils");
const path = require("path");
const fs = require("fs");
const legosUtils = require("./legosUtils");

/**
 * 添加一个module
 * @param cwdDir 命令执行的当前路径
 * @param filePath 组件文件路径 如 wq.my.js 或 ./my/wq.my.js
 */
function add(fileName, desc){
  log.info("add", fileName, desc);
  return new Promise((resolve, reject) => {


    //todo: html模板编译

    //todo: vue模板编译

    //add到legos数据库
    let pathParseObj = path.parse(filePath);

    legosUtils.addModule({
      moduleName: ''
    }).then(() => {

    }).catch(reject);

      //dev 备份

      //ftp源文件
  })

}

/**
 * 更新一个module
 * @param cwdDir 命令执行的当前路径
 * @param filePath 组件文件路径 如 wq.my.js 或 ./my/wq.my.js
 */
function update(cwdDir, filePath){

}

/**
 * 通过fileName解析module信息
 * @param fileName 文件名称 如：./my/wg.my  wg.my  wg.my.js
 */
function parse(fileName){
  //判断文件是否存在
  let currentDir = process.cwd();
  let filePath = path.join(currentDir + fileName);
  let pathParseObj = path.parse(filePath);

  //组件名称，补齐后缀
  if(!/\.(js|html|shtml|txt)$/.test(fileName)){
    //tpl目录下的是模板
    if(/[\/\\]tpl$/.test(pathParseObj.dir)){
      filePath += ".html";
    }else{ //组件
      filePath += ".js"
    }
  }

  fileName = /\.(js|html|shtml|txt)$/.test(fileName) ? fileName : fileName + ".js";


  log.info("filePath", filePath);
  if(!fs.existsSync(filePath)){
    reject({
      code: 1,
      message: `${filePath}不存在`
    })
    return false;
  }

  let pathParseObj = path.parse(filePath);
  return {
    currentDir: pathParseObj.dir,
    moduleName: pathParseObj.name,
    tplType: getTplType(filePath)
  }
}

functio getTplType(filePath){

}
