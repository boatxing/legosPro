#! /usr/bin/env node
/**
 *
 *
 *
 */


 const program = require("commander");

 program.version("1.0.0");

 program.command("module.add <moduleName>")
        .action((moduleName) => {
            console.log(moduleName)
        });
        
