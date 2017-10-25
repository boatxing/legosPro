#! /usr/bin/env node
/**
 *
 *
 *
 */


 const program = require("commander");

 program.version("1.0.0");

//添加一个module
 program.command("m.add <moduleName> <desc>")
        .alias("m.a")
        .action((moduleName, desc) => {
            console.log('m.add %s %s', moduleName, desc);
        });

//更新module
program.command("m.update <moduleName> <desc>")
       .action((moduleName, desc) => {
           console.log('m.add %s %s', moduleName, desc);
       });



program.parse(process.argv);
