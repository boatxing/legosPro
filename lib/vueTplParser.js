/**
*/
const vue = require("vue");

module.exports = (){

}

function compile(template){
  return new Promise((resolve, reject) => {
    vue.compile(template);
  })
}
