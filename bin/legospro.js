#! /usr/bin/env node
/**
 *
 *
 *
 */


 const program = require("commander");

 program.version("1.0.0");

 program.command("m.add <moduleName> <desc>")
        .action((moduleName, desc) => {
            console.log('m.add %s %s', moduleName, desc);
        });

program.parse(process.argv);
