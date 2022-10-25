## 一、什么是node.js？
### 1、node.js简介
node.js是一个基于Chrome V8引擎的JavaScript运行环境
### 2、node.js内置API
```js
1、fs
2、path
3、http
4、JS内置对象
5、querystring
6、etc
```


## 二、fs文件系统模块
### 1、fs模块导入
使用require()函数fs
```js
//使用一个常量来接收
const fs = require("fs")
```

### 2、fs.readFile()方法
读取指定文件内容
```js
//参数1(path): 必选参数，字符串，表示文件路径
//参数2(options)：可选参数，表示读写文件的编码格式
//参数3(callback)：必选参数，回调函数拿取结果
fs.readFile(path[, options], callback)

//示例
const fs = require("fs")
fs.readFile("./txt", "utf8", function(err, dataStr){
    console.log(err)        //打印读取失败结果
    console.log(dataStr)    //打印读取成功结果
})
//1、如果读取成功，err值为null
//2、如果读取失败，err值为 错误对象，dataStr值为undefined
```


### 3、fs.writeFile()方法
向指定文件写入内容
```js
//参数1：必选参数，文件路径字符串
//参数2：必选参数，写入内容
//参数3：可选参数，编码格式(默认utf8)
//参数4：必选参数，回调函数
fs.writeFile(file, data[, options], callback)

//示例
const fs = require("fs")
fs.writeFile("./txt", "Hello Word", function(err，dataStr){
    console.log(err)        //打印写入失败结果
     console.log(dataStr)    //打印读取成功结果
})
//1、如果写入成功，err值为null
//2、如果写入失败，err值为 错误对象，dataStr值为undefined
```


## 三、路径问题
### 1、相对路径
以`./`或`../`开头的相对路径，容易出现路径动态拼接问题
>拼接路径 = node命令执行目录 + 被操作文件相对路径
 
### 2、绝对路径
移植性差，不利于维护

### 3、使用__dirname
`__dirname`表示当前文件所在目录
```js
__dirname + "/被执行文件地址"
```


## 四、path路径模块
### 1、path模块导入
```js
const path = require("path")
```

### 2、path.join()方法
将多个路径片段拼接成一个完整的 路径字符串
```js
//示例
const path = require("path")

const pathStr = path.join("/a", "/b/c", "../", "/d", "e")
console.log(pathStr)//输出\a\b\d\e

const pathStr2 =path.join(__dirname, "./txt")
console.log(pathStr2)//输出 当前文件目录\txt
```

### 3、path.basename()方法
从路径字符串中，将文件名解析出来 
```js
//语法格式
path.basename(path[, ext])
//path：必选参数，表示一个路径的字符串
//ext：可选参数，表示文件扩展名
//返回值：路径中的最后一部分（文件名）

//示例
const fpath = "/a/b/c/index.html"

var fullName = path.basename(fpath)
console.log(fpath)//输出 index.html

var nameWithoutExt = path.basename(fpath, "html")
console.log(nameWithoutExt)//输出 index
```

### 4、path.extname()方法
获取路径中的扩展名部分
```js
//语法格式
path.extname(path)
//path：必选参数，表示一个路径的字符串
//返回值：扩展名字符串

//示例
const fpath = "/a/b/c/index.html"

const fext = path.extname(fpath)
console.log(fext)//输出 .html
```

## 五、http模块
### 1、http模块导入
```js 
//语法
//通常使用一个常量来接收
    const http = require("http")
```
### 2、createServer()方法
>创建web服务器
```js
1、先导入http模块
const http = require("http")

2、调用createServer()方法，创建web服务器实例
const server = http.createServer()

3、使用服务器实例的 .on(事件名, 回调函数)方法，为服务器绑定一个request事件
server.on("request", (req, res) => {
    //只要有客户端请求服务器，就会触发request事件，从而调用这个函数
    console.log("别看了，我在node控制台")
})

//参数req，是请求对象，包含了客户端相关的数据和属性
req.url //是客户端请求的url地址
req.method //是客户端的method 请求类型

//参数res，是响应对象，与服务器相关的数据或属性
//.end()方法，向客户端发送指定内容，并结束这次请求的处理过程，如
res.end(`You succeeded`)

//解决中文乱码问题,调用res.setHeader()方法
//设置Content-Type的值为 text/html; charset=utf-8
res.setHeader("Content-Type", text/html; charset=utf-8)

4、启动服务器,使用 .listen(端口号, 回调函数)方法
server.listen(80, () => {
    console.log("佛祖保佑 永不宕机")
})
```
```js

//根据不同url响应不同的内容，示例
const http = require("http")
const server = http.createrServer()

server.on("request", function(req, res){
    const url = req.url     //获取请求的url地址
    let content = `<h1>404 Not Found!</h1>`    //设置默认地址
    if(url ==="/" || url ==="/index.html"){     //是否请求首页
        content = `<h1>首页</h1>`
    } else if(url === `/about.html`){      //是否请求关于页面
        content = `<h1>关于页面</h1>`
    }
    res.setHeader("Content-Type", "text/html; charset=utf-8")   //防止中文乱码
    res.end(content)    //发送内容到客户端
})

server.listen(80, ()=>{
    console.log(Server running at 127.0.0.1:80)
})
``` 
## 六、模块化
### 1、模块分类
```js
1、内置模块：由Node.js官方提供的内置模块，如(fs  psth  http等)
2、自定义模块：用户创建的每个js文件，都是自定义模块
3、第三方模块：由第三方开发出来的模块，使用前需下载
```
### 2、加载模块
>使用`require()`方法
```js
//1、加载内置模块
const fs = require("fs")

//2、加载自定义模块
const custom = require("./custom.js")

//3、加载第三方模块（需提前下载）
const moment = require("moment")
```
### 3、模块作用域
>和函数作用域类似，自定义模块中定义的变量、方法等成员，只能在当前模块内被访问  
 
 ### 4、向外共享模块作用域中的成员
 #### 1、module对象 
 >每个自定义模块都有一个module对象，它储存了和当前模块有关的信息  
 #### 2、module.exports对象
 >自定义模块中，只用module.exports对象可以向外界共享成员  
 >外界用require()导入自定义模块时，得到的就是module.expots所指的对象
 ```js
 //在自定义模块中写入
 module.exports.name = "孙悟空" //导出属性
 module.exports.sayHello = function(){      //导出方法
    console.log("Hello World")
 }
 //在其他模块引用,并用个常量来接收
 const m = require("./module")
 console.log(m)     
 //输出  { name: '孙悟空', sayHello: [Function (anonymous)] }
 ```
 #### 3、exports对象
 默认情况下，`exports`和`mudule.exports`指向同一个对象，最终结果以`module.exports`为准
 ```js
 console.log(module.exports === exports)
 //输出 true

 //二者只要有一方的值为对象，则不会全等，因为创建了新对象
 ```
### 5、node.js的模块化规范
node.js遵循了CommonJS模块化规范，CommonJS规定了**模块的特性**和**各个模块之间如何相互依赖**  
>module变量代表当前模块，他也是个对象  

## 七、npm与包
```js
//node.js中第三方模块就是包，包是基于内置模块封装出来的
//2、包的检索和下载
//  包的检索
        https://www.npmjs.com/  

/*  包的下载
        通过包管理工具 
*/

npm install 包
npm i 包
```
### 3、包的分类
```js
//1、项目包：被安装到node_modules目录中的包都是项目包
/* 
    项目包分为：
        开发依赖包：被记录到devDependencies节点中的包，只在开发期间会用到
        核心依赖包：被记录到dependencies节点中的包，开发和项目上线都会用到
*/
npm i 包名 -D //开发依赖包
npm i 包名    //核心依赖包

//2、全局包：在执行npm install 命令是，提供了-g参数，则会安装到全局包
npm i 包名 -g   
```


## 八、模块加载机制


## 九、Express
### 1、Express简介  
Express是一个npm的第三方包  

Express的作用和Node.jd内置的http模块类似，是专门用来创建Web服务器的  
  
```js
//常用的两种服务器
Web网站服务器：对外提供Web网页资源的服务器  
API接口服务器：对外提供API接口的服务器  
```  
>API: 封装好的函数（功能）  
>API接口：调用函数的接口  

### 2、Express基本使用  
```js
//创建基本的web服务器

//1、导入express模块
const express = require("express")

//2、创建web服务器
const app = express()

//3、调用app.listen(端口号，启动成功后的回调函数），启动服务器  
app.listen(80, () => {
    console.log("express server running at 80")
})
```
### 3、监听GET请求
通过`.get()`方法
```js
//示例
app.get("请求URL", function(req, res) {
    //处理函数
})
//参数1：客户端请求的URL地址
//参数2：请求对应的处理函数
//          req：请求对象
//          res：响应对象
```
### 4、监听POST请求
通过`.post()`方法  
```js
//示例(与get类似)
app.post("请求URL", function(req, res) {
    //处理函数
})
//参数1：客户端请求的URL地址
//参数2：请求对应的处理函数
//          req：请求对象
//          res：响应对象
```
### 5、把内容响应给客户端
通过`res.send()`方法
```js
//示例
app.get("/user", (req, res) => {
    //向客户端发送JSON对象
    res.send({ name: "孙悟空", age: 500, gender: "男"})
})

app.post("/user", (req, res) => {
    //向客户端发送文本内容
    res.send("请求成功")
})
```
### 6、获取URL中携带的查询参数
通过req.query对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数  
```js
app.get("/", (rea, res) => {
    //req.query 默认是一个空对象
    //客户端使用 ?name=zs&age=20 这种查询字符串的形式，发送到服务器的参数
    //可以通过 req.query 对象访问到，例如：
    // req.query.name       req.query.age
    console.log(req.query)
})
```
### 7、获取URL中的动态参数
通过req.params对象，可以访问到URL中，通过:匹配到的动态参数：
```js
//URL地址中，可以通过 :参数名 的形式，匹配到动态参数值
app.get("/user/:id", (req, res) => {
    //req.params 默认是一个空对象
    //里面存放着通过 : 动态匹配到的参数值
    console.log(req.params)
    res.send(req.params)
})
```
### 8、托管静态资源
#### （1）、express.static()
> `express`提供了一个函数：`express.static()`，通过这个函数可以方便地创建一个静态资源服务器  
  
> 该方法可以对外提供静态资源
```js
//public是一个文件目录，它不会出现在URL中
app.use(express.static("public"))
```
#### （2）、托管多个静态资源目录
方法：多次调用`express.static()`方法  
> 注意：先调用，先查找  
  
#### (3)、挂载路径前缀  
```js
//语法
app.use("/public", express.static("pubic"))
```
#### (4)、nodemon
`nodemon`能监听项目的变动，当代码修改后，他会自动帮我们重启项目  
```js
//安装nodemon
npm install -g nodemon

//使用nodemon
nodemon 项目地址
```

## 十、express路由
### 1、路由的概念
在Express中，路由是指**客户端的请求**与**服务器处理函数**之间的***映射关系***
```js
//Express中路由分三部分组成：请求类型、请求的URL地址、处理函数

//METHOD：请求类型(如：get、post)
//PATH：请求的URL地址
//HANDLER：处理函数
app.METHOD(PATH, HANDLER)

//示例
app.get("/user", (req, res) => {
    res.send("路由成功")
})
```
### 2、挂载路由
```js
app.get("/",(req, res) => {
    res.send("Hello World")
})

app.post("/",(req, res) => {
    res.send("Hello World")
})
```
### 3、模块化路由
模块化路由：将路由抽离为单独的模块  
>使用express.Router()方法创建路由对象，将路由挂载到路由对象上，然后向外导出
```js
//步骤1：创建路由对应的js文件
//步骤2：调用express.Router()函数创建路由对象
//步骤3：向路由对象挂载集体的路由
//步骤4：使用module.exports向外共享路由对象
//步骤5：使用app.use()函数注册路由模块

const express =require("express")   //1.导入express

const router = express.Router()     //2.创建路由对象

router.get("/user/list", function(req, res), {      //3.挂载换取用户列表的路由
    res.send("Get user list")
})      

router.post("/user/add", function(req,res) {        //4.挂载添加用户路由
    res.send("Add new user")
})      

module.express = router     //5.向外导出路由对象
```

### 4、注册路由模块
```js
//1、导入路由模块
const userRouter = require("./router/user.js")

//2、使用app.use()注册路由模块
app.use(userRouter)
```

### 5、给路由模块添加路径前缀
```js
//1、导入路由模块
const userRouter = require("./router/user.js")

//2、使用app.use()注册路由模块,并添加统一访问路径/api
app.use("/api", userRouter)
```
## 十 一、Express中间件
### 1、中间件的概念
中间件就是中间处理环节
>Express中间件，本质就是一个函数
```js
//中间件具函数有三个参数，且在语句最后需要调用next()函数
const mw = function(req, res, next){
    console.log("这是一个简单的中间件")
    //中间件函数处理完后，需要调用next(),将业务往下流转
    next()
}
```

### 2、全局中间件
客户端发起的任何，到达服务器之后，都会触发的中间件  
定义一个全局中间件语法：app.use("中间件函数")
```js
//示例,创建一个中间件函数
const mw = function(req, res, next) {
    console.log("这是一个简单的中间件")
    next()
}

//全局生效
app.use(mw)
```

### 3、中间件的作用
多个中间件可以共享同一份req和res。上游添加的属性和方法可以供下游使用

### 4、局部中间件
不使用app.use()注册的中间件，就是局部中间件
>局部中间件只有被路由调用才会生效
```js
//定义一个中间件并使用一个常量接收
const mw = function(req, res, next) {
    console.log("这是中间件函数")
    next()
}

//将mw中间件作为路由的参数使用，多个参数可以用数组包起来
app.get("/", mw, (req, res) => {
    console.log("我使用了mw中间件")
})
```

### 5、中间件的五个注意事项
```js
1、一定要在路由之前注册中间件
2、客户端发来的请求可以用多个中间件处理
3、执行完业务代码之后，不要忘记调用next()函数
4、next()之后不要再写额外的代码
5、连续调用多个中间件时，他们之间共享req,res对象
```

## 十二、中间件的分类
### 1、应用级别的中间件
通过`app.use()`或`app.get()`或`app.post()`，绑定到**app**实例上的中间件，叫做应用级别的中间件

### 2、路由级别的中间件
绑定到`express.Router()`实例上的中间件，叫做路由级别的中间件  
>应用级别和路由级别的区别在于，应用级别绑定到app实例上，路由级别绑定到router实例上，用法没有区别  

### 3、错误级别的中间件
有4个形参(err, req, res, next)  
作用：捕获整个项目中发生的异常错误，防止项目崩溃  
```js
//示例
app.get("./", function(req, res) => {
    //抛出一个自定义错误
    throw new Error("服务器内部发送了错误")
    res.send("Home Page")
})

//错误级别中间件
app.use(function(err, req, res, next) {
    console.log(`发送了错误${err.message}`)
    res.send(`Error${err.message}`)
})
```

### 4、Express内置的中间件
```js
//1、express.static 快速托管静态资源的内置中间件
//2、express.json 解析json格式的请求体数据
app.use(express.json())
//3、express.urlencoded 解析URL-encoded 格式的请求体数据
app.use(express.urlencoded({ extended: false }))
```

### 5、第三方中间件
非Exprss官方内置的，由第三方开发的中间件  
常用的有`body-parser`  
```js
//1、安装body-parser中间件
npm install body-parser

//2、导入中间件
const parse = require("body-parser")

//3、注册中间件
app.use(parser.urlencoded({ extended: false}))
```

## 十三、自定义中间件
### 1、监听req的data事件
```js
//解析表单数据的中间件
app.use((req, res, next) => {
    //(1)、定义一个str字符串，用来存储客户端发来的请求体数据
    let str = ""
    //(2)、监听req的data事件
    req.on("data", (chunk) => {
        str += chunk
    })
})
```
### 2、监听req的end事件
```js
//监听req的end事件
req.on("end", () => {
    //str存放的是完整的请求体数据
    console.log(str)
    //把字符串解析成对象格式
    const body = qs.paese(str)
    console.log(str)
})
```
## 十四、使用Express写接口
