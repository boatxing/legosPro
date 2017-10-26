/**
 * html模板编译
 *
 */
class Template {
  constructor(options, helper) {
    if (typeof options == "string") {
      options = {
        tpl: options
      }
    }
    this.init(options, helper);
  }

  parse(self) {
    if (!self.__lines) {
      self.__lines = [];
    }
    var temp, i = 0;
    //?: 不分组  ?= 紧跟者
    //按照分隔符分开，如果遇到分隔符是{{,}}的情况，{{{44}}},会先被分为"{{{44} }}"，最后被分割为["{","{{44}", "}}"]
    //例如：{{}}} ->["{{}", "}}"]  {{{->["{","{{"]
    if (self.right == "}}") { //这里是为了解决}}}造成的bug!
      temp = self.tpl.replace(/(}})([^}])/g, "$1 $2").split(new RegExp('(?=' + self.left + ')|(' + self.right + ')(?:[^}])'))
    } else {
      temp = self.tpl.split(new RegExp('(?=' + self.left + ')|(' + self.right + ')'))
    }

    //过滤右分隔符，["{","{{44}", "}}"] -> ["{","{{44}"]
    temp.filter((item) => {
      return !(new RegExp(self.right)).test(item);
    })
    temp.forEach(
      function(v, k) { //核心代码
        //分3中情况
        //<&= title()   '^'+self.left+'\s*='    temp.push(title())  放到temp中
        //<& for(var i=0,tl = @trs.length,tr;i<tl;i++){  &>   直接放到self.body中
        //<table border=1>                    放到temp中
        if ((new RegExp('^' + self.left)).test(v)) {
          v = v.replace(/@/g, 'data.');
          if (new RegExp('^' + self.left + '\s*=').test(v)) {
            self.body.push(v.replace(new RegExp('^' + self.left + '\s*=(.*)'), '\ttemp.push($1);\n'));
          } else {
            self.body.push(v.replace(new RegExp('^' + self.left + '\s*(.*)'), '$1\n'));
          }
        } else {
          //这样写就不需要转义
          self.__lines[i] = v;
          self.body.push('\ttemp.push(this.__lines[' + (i++) + ']);\n');
        }
      })

    //返回方法体，temp中的才是最终的html代码
    return self.body.join("");
  }

  //初始化
  init(options, helper) {
    this.tpl = options.tpl; //html模版
    this.left = options.left || "{{"; //左分隔符，本例中就是<&
    this.right = options.right || "}}"; //左分隔符，本例中就是&>
    this.body = []; //主要用来存放模版的主要方法体
    this.compiled = null; //定义compiled方法
    this.data = options.data; //数据
    this.helper = helper; //helper对象
  },
  compile() { //编译模版，将模版解析为一个function
    var helper = [];
    if (this.helper) { //将helper对象解析为var <key> = <value> 的变量定义形式
      for (var h in this.helper) {
        helper.push('var ' + h + '=this.helper["' + h + '"]');
      }
    }
    this.compiled = new Function("it", helper.join(";") + ';var temp=[];\n' + Template.parse(this) + '\n return temp.join("");');
    return this.compiled;
  },
  render(data) {
    return this.compile().call(this, data || this.data);
  }
}

module.exports.compile = function(tpl){
  return new Template(tpl).compile();
}
