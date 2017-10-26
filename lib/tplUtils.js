/*
 * 模板编译
 * 将html模板和vue模板编译为module
 */
const htmlTpl = require("./htmlTplParser");
const vueTpl = require("./vueTplParser");
const log = require("./log").logger("moduleUtils");

/**
 * 模板编译
 * @param data 模板内容
 */
module.exports.compile = function(data){
  log.info("tpl compile")
  let length = data.length, index = 0, content = "",
    peek = "", p = 0, type = "", id = "", mod = "",
    tpls = [];

  //模板解析
  while(index < length){
    readch()
    if(peek == "<"){
      p = index;
    }
    content += peek;
    if(peek == ">"){
      mod = content.match(/^<\s*script\s+type=['"](.*)['"]\s+id="(.*)"\s*>$/);
      //获取模板类型和id
      if(mod.length){
        if(!type){
          type = mod[1];
          //无type
          if(!type){
            reject({
              code: 1,
              message: `模板不合法，未知模板类型`
            });

            return false;
          }
        }
        type = mod[1];
        id = mod[2];
        if(!id){
          reject({
            code: 1,
            message: `模板不合法，未知模板id`
          })
          return false;
        }

        content = "";
      }

      if(/^<\s*\/script\s*>$/.test(content) && id){  //模板
        //模板
        content = content.slice(0, p - 1);
        tpls.push({
          id: id,
          type: type,
          content: content;
        })
        id＝ "";
      }
    }
  }

  //模板编译

  function readch() {
    peek = data.charAt(index++)
  }
}
