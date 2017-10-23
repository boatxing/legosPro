/**
 * Created by boat on 2017/10/15.
 * webpack 打包
 */
const moduleLoader = require("./moduleLoader");
const base = require("../webpack.base.config");
const webpack = require("webpack");
const merge = require("webpack.merge");

let isPacking = false;

/**
 * webpack打包
 * @param enter 入口js
 * @param webpackConfig 自定义config（当前命令文件夹下的webpack.config.js）
 */
function pack(enter, webpackConfig){
    return
    new Promise((resolve, reject) => {
        if(!isPacking){
        isPacking = true;
    } else{
        reject({

        })
    }
    //合并基础config和自定义config
    webpackConfig = merge(base, webpackConfig, {entry: `../build/${enter}`});

    //moduleLoader
    moduleLoader.loadEnter(enter).then(() => {
        //pack
        webpack(webpackConfig, (err, states) => {

        //ftp 打包后的文件
    })
}).catch((e) => {

    })
    })
}