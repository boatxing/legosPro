/**
 * Created by user on 2017/10/19.
 */
const ftpTest = require("../lib/ftpUtils");
const path = require("path");

ftpTest.put(path.join(__dirname, "/log-test.js"), "/export/wxsq/node_services/log-test.js", (err, result) => {

})