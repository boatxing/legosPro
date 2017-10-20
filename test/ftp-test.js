/**
 * Created by user on 2017/10/19.
 */
const ftpTest = require("../lib/ftpUtils");

ftpTest.put("log-test.js", "/home/boat/test/test/ftpUtils.js", ({code, msg}) => {
    console.log(code, msg);
})