/**
 * Created by user on 2017/10/19.
 */
const ftpTest = require("../lib/ftpUtils");
const path = require("path");

ftpTest.put(path.join(__dirname, "/log-test.js"), "/home/boat/test13/test1/log-t.est.js").then(({code, message}) => {
    console.log(message)
}).catch((e) => {
    console.log(e.message);
})