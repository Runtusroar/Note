## 一、Ajax简介
### 1、什么是Ajax
>Ajax：`异步JS`和`XML`  
>优势：无刷新获取数据  

### 2、什么是XML
>XML：可扩展标记语言  
>作用：`传输`和`存储数据`  

### 3、HTTP协议
也叫[超文本传输协议]，规定了浏览器和web服务器之间互相通信的规则  
#### (1) 请求[报文]
```js
//格式: 行 + 头 + 空行 + 体
行      1、请求类型(get、post)
        2、URL路径
        3、HTTP版本

头      全是：[键: 值]对的形式

空行    就是一个空格

体      如果是get请求，这里为空
        如果是post请求，这里可以不为空
```
#### (2) 响应[报文]
```js
//格式
行      1、HTTP版本
        2、响应状态码
        3、响应状态字符串

头      全是：[键: 值]对的形式

空行    就是个空格

体      返回的结果
```
#### 3、URL地址的组成部分
```js
//三部分
1、通信协议
2、服务器名称
3、资源在服务器上的具体存放位置(端口)
```
## 二、XHR对象
### 1、XHR简介
`XMLHttpRequest`是浏览器提供的JavaScript对象，通过它可以请求服务器上的数据资源  
>XMLHttpRequest简称xhr  

### 2、使用xhr发起get请求
#### 2.1、不带参数
```js
//步骤
//1、创建xhr对象
const xhr = new XMLHttpRequest()

//2、调用xhr.open()函数，指定 请求方式 与 URL地址
xhr.open("get", "http://127.0.0.1:8000/user")

//3、调用xhr.send()函数，发起Ajax请求
xhr.send()

//4、监听xhr.onreadystatechange事件
xhr.onreadystatechange = function(){
        //监听xhr对象的 请求状态 readyState；和服务器 响应状态 Status
        if(xhr.readyState === 4 && xhr.status === 200) {
                //打印服务器响应回来的数据
                console.log(xhr.responseText)
        }
}
```
#### 2.2、带参数
```js
//使用XHR发起带参数的请求时，只需要将参数添加到URL地址后面即可，参数前加个?
xhr.open("get", "http://127.0.0.1:8000/user?id=1")

//URL参数 也叫 查询字符串
//格式：?键值对&键值对
        ?参数=值&参数=值
```

#### 2.3、xhr的`readyState`属性和 `starus`属性介绍
```js
//1、请求状态xhr.readyState属性值

xhr.readyState是ajax 执行时的步骤 例如：

0：初始化，XMLHttpRequest对象还没有完成初始化
1：载入，XMLHttpRequest对象开始发送请求
2：载入完成，XMLHttpRequest对象的请求发送完成
3：解析，XMLHttpRequest对象开始读取服务器的响应
4：完成，XMLHttpRequest对象读取服务器响应结束
 

//2、响应状态xhr.status属性值

xhr.status 是一种状态码，status是XMLHttpRequest对象的一个属性，表示响应的HTTP状态码
在HTTP1.1协议下，HTTP状态码总共可分为5大类  例如：

200——交易成功
404——没有发现文件、查询或URl

————————————————
版权声明：本文为CSDN博主「结果才重要」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/m0_60237095/article/details/118875921
```

### 2、URL编码
URL编码：使用英文字符 来表示 非英文字符  
```js
//编码函数
encodeURI()

//解码函数
decodeURI()
```
>浏览器会自动对url地址进行编码，因此并不需要我们操作  

### 3、使用XHR发起post请求
```js
//1、创建xhr对象
const xhr = new XMLHttpRequest()

//2、调用open()方法，指定 请求方式 和 url地址
xhr.open("post", "http://127.0.0.1:8000/usser")

//3、设置响应头
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")

//4、调用send()，同时将查询字符串填入括号中（注意：不用加?）
xhr.send("id=1&name=孙悟空")

//5、监听onreadystatechange事件
xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200){
                console.log(xhr.responseText)
        }
}
```

## 三、数据交换格式
数据交换格式就是`服务器`和`客户端`进行数`据传输和交换`的格式  
### 1、xml
一种可扩展标记语言 和html类似  
数据载体，前端一般不用

### 2、JSON  
`JSON`是`JS`的`对象和数组`的字符串表示法，本质是`字符串`  
```js
//这是对象
let obj = {a: 'hello', b: 'World'}

//这是JSON字符串
let json = '{"a": "Hello", "b": "World"}'
```

#### 2.1 JSON的对象结构  
```js
//用{}括起来，里面是键值对结构，key要用""包裹
//value的数据类型可以是 数字、字符串、布尔值、null、数组、对象6种类型，不能是undefined、function
{"key": value, "key": value}
```

#### 2.2 数组结构
```js
//用[]括起来，不能是undefined、function
["string", "string"]
[number, number]
[true, false, null]
```

#### 2.3 JSON语法注意事项
```js
1、属性名必须用双引号包裹
2、字符串裂隙必须是双引号包裹(不能单引号)
3、JSON不能写注释
4、最外层必须是{}或[]格式
```

#### 2.4 JSON和JS对象互转
```js
//js对象 -> json   (序列化)
JSON.stringify()方法

//json -> js对象  (反序列化)
JSON.parse()方法
```

## 四、封装自己的Ajax函数

## 六、axios
axios是一个js库，其专注于网络数据请求 
### 1、get请求
```js
//语法
axios.get("url",{ params: {参数}}).then(callback)

//示例
const url = "127.0.0.1:8000/user"
const paramsObj = {name: "孙悟空", age: 500}
axios.get(url, {params: paramsObj}).then(function(res){
        console.log(res.data)
})
```
### 2、post请求
```js
//语法
axios.post("url", {参数}).then(callback)

//示例
const url = "127.0.0.1:8000/user"
const dataObj = {name: "孙悟空", age: 500}
axios.post(url, dataObj).then(function(res){
        console.log(res.data)
})
```
### 3、axios请求
```js
//语法
axios({
        method: "请求类型"
        url: "请求的url地址"
        data: {/* post参数 */}
        params: {/* get参数 */}
}).then(callback)
```

## 七、跨域和CORS
### 1、同源
同源：相同的`协议`、`域名`、`端口`  
同源策略：不同源的网站之间不能进行数据交互  

### 2、跨域
跨域：URL的`协议`、`域名`、`端口`不一致  
