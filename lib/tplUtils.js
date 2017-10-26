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
module.exports.compile = function(moduleName, data){
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
            throw new Error(`模板不合法，未知模板类型`);
            return false;
          }
        }
        type = mod[1];
        id = mod[2];
        if(!id){
          throw new Error(`模板不合法，未知模板id`);

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

  if(!tpls.length){
    throw new Error("模板不合法，请检查模板内容")
    return false;
  }

  //模板编译
  let tplObj = ['define("', moduleName ,'",function(require,exports,module){'];
  tpls.forEach((item, index) => {
    if(item.type != "vue"){
      tplObj.push((index == 0 ? 'exports.template=' : 'exports.child_' + item.id + "=") + htmlTpl.compile(item.content));
    }else{
      if(index == 0){
        tplObj.push('module.exports=' + vue.compile(item.content)+";");
      }else{
        index == 1 && tplObj.push('module.exports.subs={};');
        tplObj.push('module.exports.subs["' + item.id + '"]=' + vue.compile(item.content) + ";");
      }
    }
  })

  function readch() {
    peek = data.charAt(index++)
  }

  //输出编译后的module
  tplObj.push("})");
  return tplObj.join("");
}
