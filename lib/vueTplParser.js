/**
*/
const vue = require("vue");

module.exports.compile = function(template){
  return new Promise((resolve, reject) => {
    let rener = vue.compile(template);
    resolve(render);
  })
}
