#! /usr/bin/env node

/**
 * 主程序入口
 * @auth boatxing
 * @version 2017/10/25
 */
const program = require("commander");
const moduleUtils = require("../lib/moduleUtils");

program.version("1.0.0");

//添加一个module
program.command("m.add <moduleName> <desc>")
  .alias("m.a")
  .action((moduleName, desc) => {
    moduleUtils.add(moduleName, desc).then(({code, message}) => {
      console.log(message);
    }).catch(({code, message}) => {
      console.error(message);
    })
  });

//更新module
program.command("m.update <moduleName> <desc>")
  .alias("m.u")
  .action((moduleName, desc) => {
    console.log('m.add %s %s', moduleName, desc);
  });

//ftp文件
program.command("ftp <filePath>")
  .option("-d --dev [devPath]", "服务器路径")
  .option("-c --clear", "清除服务器路径缓存")
  .action((filePath, options) => {

  })

//打包

//发布

program.parse(process.argv);
