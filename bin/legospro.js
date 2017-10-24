#! /usr/bin/env node
/**
 *
 *
 *
 */


 const program = require("commander");

 program.version("1.0.0");

 program.command("m.add <moduleName>")
        .action((moduleName) => {
            console.log('m.add %s', moduleName);
        });

program.parse(process.argv);
