# legosPro
命令行模块化构建工具

##legosUtil
###legos数据库信息
schema: legos
user: 
password: 
port:3306 

表：
tbl_package
tbl_package_history
tbl_project

###接口
add
get(moduleId)

##devUtil
###dev:
源文件
/export/wxsq/resource/js/legos/<项目名称>/<moduleName>.js

编译后文件（备份用，每个module最多20个版本）
/export/wxsq/resource/js/version/<大版本号>/tpl_introduce.<小版本号>.js
大版本号：201710
小版本号：201710121445

###接口
add

##moduleLoader
###分析模块依赖
###loader
调用legosUtil接口将module src拉到本地，修改require路径

##pack
###html模板处理:
tpl_\<moduleName\>.html
<h2>vue模板处理:</h2>
vue_\<moduleName\>.html

###pack




