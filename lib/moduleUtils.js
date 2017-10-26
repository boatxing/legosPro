/**
 * Created by boat on 2017/10/23.
 * 提供添加组件，更新组件功能
 */
const log = require("./log").logger("moduleUtils");
const path = require("path");
const fs = require("fs");
const legosUtils = require("./legosUtils");
const ftpUtils = require("./ftpUtils");
const depsUtil = require("./depsUtil");
const tplUtils = require("./tplUtils");

const jsDevPath = "/export/wxsq/resource/js/legos/";

/**
 * 添加一个module
 * @param filePath 组件文件路径 如 wq.my.js 或 ./my/wq.my.js
 * @param desc 描述
 */
function add(fileName, desc){
  log.info("add", fileName, desc);
  return new Promise((resolve, reject) => {
    let result = parse(fileName);
    log.debug("parse result", result);
    if(result.code != 0){
      reject(result);
      return false;
    }

    fs.readFile(result.filePath, 'utf-8', (err, data){
      if(err){
        log.error(err);
        reject({
          code: 1,
          message: `读取文件内容失败${filePath}`
        })
        return false;
      }

      //todo: html模板编译, vue 模板编译
      let tplCode = "";
      if(result.isTpl){
        tplCode = tplUtils.compile(data);
        log.info("tpl parse");
      }

      //ftp到dev服务器
      ftpUtils.put(result.filePath, result.codePath).then(() => {
        //add到legos数据库
        legosUtils.addModule({
          moduleName: result.moduleName,
          pPath: result.projectpath,
          content: result.isTpl ? tplCode : data, //如果是模板需要使用编译后的module
          desc: desc,
          deps: result.isTpl ? '' : depsUtil.parseDependencies(data).join(";"),
          codePath: result.codePath,
          codeSrc: result.codePath.replace("/export/wxsq/resource", "http://wq.360buyimg.com"),
          targetPath: result.targetPath,
          targetSrc: result.targetPath.replace("/export/wxsq/resource", "http://wq.360buyimg.com"),
          type: result.isTpl ? 2 : 1,
          tplSource result.isTpl ? data: '',
          tplPath: result.tplPath
        }).then(() => {
          ftpUtils.put(result.filePath, result.targetPath).catch(reject);
        }).catch(reject);
      }).catch(reject);
    })
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
  let isTpl = 0;
  if(!/\.(js|html|shtml|txt)$/.test(fileName)){
    //tpl目录下的是模板
    if(/[\/\\]tpl$/.test(pathParseObj.dir)){
      filePath += ".html";
    }else{ //组件
      filePath += ".js"
    }
  }

  log.info("filePath", filePath);
  if(!fs.existsSync(filePath)){
    return {
      code: 1,
      message: `${filePath}不存在`
    }
  }

  let pathParseObj = path.parse(filePath);
  //项目名称
  let projectPath = pathParseObj.dir.match(/js[\/\\]legos[\/\\](.*)[\/\\](?:tpl[\/\\])?.*\.(?:js|html|shtml)$/);
  if(!projectPath.length){
    return {
      code: 1,
      message: `获取项目路径失败${filePath}`
    }
  }

  projectPath = projectPath[1].replace("\\", "/");
  projectPath = jsDevPath + projectPath;

  //版本号
  let now = new Date();
  let v1 = now.getFullYear() + "" + ("0" + (now.getMonth() + 1)).slice(-2);
  //201710251223
  let v2 = v1 + "" + ("0" + now.getDate()).slice(-2) + "" + ("0" + now.getHours()).slice(-2) + "" + ("0" + now.getMinutes()).slice(-2);

  let info = {
    filePath: filePath,
    currentDir: pathParseObj.dir,
    moduleName: pathParseObj.name,
    projectPath: projectPath,
    codePath: projectPath + "/" + pathParseObj.name + ".js",
    targetPath: `/export/wxsq/resource/js/version/${v1}/${pathParseObj.name}.${v2}.js`
    isTpl: /\.html|\.shtml$/.test(filePath),
    tplPath: ''
  }
  if(info.isTpl){
    info.tplPath = projectPath + "/tpl/" + pathParseObj.name + pathParseObj.ext;
  }

  return info;
}
