 ## 一、Vue简介  
 ### 1、Vue介绍
Vue是一套用来动态构建用户界面的渐进式JavaScript框架  
    
### 2、初始Vue
```js
注意：`Vue实例`和`容器`是一一对应的

//创建Vue实例
new Vue ({
    //选择容器
    el: CSS选择器,
    //配置对象
    data: {
        键: 值,
        键: 值
    }，
    methods: {
        函数
    }
})

//容器：被Vue实例选中的Html元素就是容器
```

### 3、Vue模板
控制Html元素的方式
```js
//插值语法：
    功能：解析标签体内容
    语法：{{内容}}

//指令语法
    功能：解析标签.(如：标签属性、绑定事件、包括标签体)
    语法：  
        1、单向数据绑定：v-bind: //数据只能从data流向页面  简写b-bind: ==> :
        2、双向数据绑定：v-model: //data于页面双向流动  简写v-model:value ==> v-model
```

### 4、el与data写法
```js
//el
    1、在Vue实例中配置
    2、通过vm.$mount("#root")

//data
    1、对象式：data{写在这里面}
    2、函数式：data(){ return{写在这里面} }
    //以后的组件必须函数式，如果是箭头函数this指向将不是实例
```

## 二、MVVM模型
### 1、NVVM模型
```js
1、M：模型(Model)：data中的数据 //Vue实例中的data数据
2、V：视图(View)：模板代码  //被Vue选中的容器中
3、VM：视图模型(ViewModel)：Vue实例 //将两者联系起来
```
### 2、数据代理
通过一个对象代理对另一个对象中属性的操作
```js
data中的属性都能在Vue中找到，是因为Vue对data进行了数据代理

方法：Object.defineProperty()
    通过该方法中的getter、setter函数
```

## 三、事件处理
### 1、基本用法
```js
1、使用v-on: xxx 或 @xxx绑定事件
2、事件回调配置在Vue实例中的methods对象中，但是最终也会出现在vm上
3、methods中配置的函数如果是箭头函数，this将不指向vm
4、@click="demo" 和@click="demo($event)"一致，但后者可以传参
```

### 2、事件修饰符
```js
//放在事件后面，当属性用
1、prevent  阻止默认事件//如a标签点击跳转
2、stop     阻止事件冒泡
3、once     事件只触发一次
4、capture  使用事件的捕获模式
5、self     只用event.target是当前操作元素时才触发事件 //即事件触发对象是我自己
6、passive  事件默认行为立即执行，无需等待事件回调完毕

//修饰符可以连写，如：@click.prevent.stop = ""
```

### 3、键盘事件
键盘上的每个按键都有自己的名称和编码，例如：Enter（13）。而Vue还对一些常用按键起了别名方便使用
```js
1、Vue中常用的按键别名
    回车enter
    删除delete捕获“删除”和“退格”键
    退出esc
    空格space
    换行tab特殊，必须配合keydown去使用
    上up
    下down
    左left
    右right

2、Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（多单词小写短横线写法）

3、系统修饰键（用法特殊）ctrlaltshiftmeta（meta就是win键）
    (1)配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
    (2)指定 ctr+y 使用 @keyup.ctr.y

配合keydown使用：正常触发事件

4、也可以使用keyCode去指定具体的按键（不推荐）

5、Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名
```

## 四、计算属性
```js
1.计算属性：通过已有属性计算得来，存放在Vue实例的computed中，最终会出现在vm上
2.原理：借助了Object.defineProperty()方法提供的getter和setter  
3.getter什么时候执行？  
    (1).初次读取时会执行一次  
    (2).当依赖的数据改变时会再次执行  
4.优势：与mothods相比，内部有缓存机制，提高代码复用  
5.修改：使用setter修改，需引起所依赖的数据改变  

//示例
const vm = new Vue ({
    el: "#root"
    data: {
        firstName: "孙"
        lastName: "悟空"
    }
    computed:{
        //该对象最终会成为vm的属性，getter的返回值成为其属性值
        fullName:{
            //读取fullName时调用getter
            get(){
                return this.firstName + "-" + this.lastName
            };

            //修改fullName时调用setter，且修改值用参数接收，并修改所依赖的值
            set(value){
                const arr = value.split("-")
                this.firstName = arr[0]
                this.lastName = arr[1]
            }
        }
    }
})

//若计算属性只读不改，可以简写
computed:{
    //将计算属性和getter结合为
    fullName(){
        return this.firstName + "-" + this.lastName 
    }
}
```

## 五、监视属性
监视一个属性是否发生变化
### 1、初识监视
```js
监视属性：watch
    1、当被监视属性发生变化时，回调函数自动调用
    2、被监视的值必须存在(因为不会报错)
    3、写法：
        (1)、在实例里面写入watch配置
        (2)、通过vm.$watch监视

//示例：写在实例里面
const vm = new Vue ({
    el: "#root",
    data: {
        isHot: true
    },
    watch: {
        //被监视的属性
        isHot:{
            //当isHot改变时，handler被调用
            //newValue参数：改变后的值，oldValue参数：改变前的值
            handler(newValue, oldValue){
                console.log(newValue, oldValue);
            }
        }

        //当isHot里只有handler时，可以简写为
        isHot(newValue, oldValue){
            console.log(newValue, oldValue)
        }
    }
})


//示例：写在示例外边
vm.$watch("isHot", {
    handler(newValue, oldValue){
        consol.log(newValue, oldValue)
    }
})

//isHot里只有handler时，可以简写为
vm.$watch("isHot",function (newValue, oldValue) {
    console.log(newValue, oldValue)
})
```

### 2、深度监视
开启方式：在watch中配置deep: true
```js
深度监视：
    (1).Vue中的watch默认不监测对象内部值的改变(一层)
    (2).配置deep:true可以监测对象内部值的改变

备注：Vue自身可以检测对象内部值的改变，但是Vue的watch不可以
```

## 六、绑定样式
### 1、绑定class样式
```js
//语法
    :class="字符串/数组/对象"

//示例
<body>
    <div id="root">
        <div :class="mood"></div>
        <div :class="classArr"></div>
        <div :class="classObj"></div>
    </div>

    <script>
        const vm = new Vue({
            el: "#root"
            data: {
                mood: "类名",
                classArr: "[类名1, 类名2]",
                classObj: "{类名1: true, 类名2: true}"
            }
        })
    </script>
</body>
```

### 2、绑定style样式
```js
//语法
    :style="对象/数组"

//示例
<body>
    <div id="root">
        <div :style="styleObj1"></div>
        <div :style="styleObj2"></div>
        <div :style="styleArr"></div>
    </div>

    <script>
        const vm = new Vue({
            el: "#root"
            data: {
                styleObj1: {
                    fontSize: "20px"
                    color: "red"
                },
                styleObj2: {
                    backgroundColor: "balck"
                },
                styleArr: "[styleObj1, styleObj2]"
            }
        })
    </script>
</body>
```

## 七、条件渲染
用于表示html元素是否展示
### 1、v-show
```js
//语法
    v-show="表达式"     //为true展示，为false不展示

//底层原理是：disblock: none
```
### 2、v-if
```js
//语法  如果要连用，则结构不可被打断
    v-if="表达式"
    v-else-if="表达式"
    v-else="表达式"

//该方法会将dom元素移除
```

## 八、列表渲染
### 1、v-for指令
```js
//用于遍历数据
//语法
v-for="(item, index) in 遍历对象" :key="id"

//item是遍历内容，index是遍历索引值
//:key是每个列表的id

//示例
<body>
    <div id="root">
        <h2>人员列表</h2>
        <li v-for="(p, index) in persons" :key="p.id">{{p.name}}--{{p.age}}</li>
    </div>
    <script>
       new Vue ({
           el: '#root',
           data: {
               persons: [
                {id: 01, name: "孙悟空", age: 500},
                {id: 02, name: "沙和尚", age: 1000},
                {id: 03, name: "猪八戒", age: 2000}
               ]
           },
       })
    </script>
</body>
```

### 2、列表过滤
```js
//人员列表过滤
<body>
    
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="输入名字" v-model="keyWord">
        
        <li v-for="(p, index) of filPersons" :key="p.id">
            {{p.name}}--{{p.age}}
        </li>
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                keyWord: "",
                persons: [
                    { id: 01, name: "马冬梅", age: 500 },
                    { id: 02, name: "周冬雨", age: 1000 },
                    { id: 03, name: "周杰伦", age: 2000 },
                    { id: 04, name: "温兆伦", age: 2000 }
                ],
                filPersons: []
            },
            //计算属性实现过滤
            computed: {
                filPersons(){
                    return this.persons.filter((p)=>{
                        return p.name.indexOf(this.keyWord) !== -1
                    })
                }
            }
        })
    </script>
</body>
```

### 3、列表排序
```js
<body>
    <div id="root">
        <h2>人员列表</h2>
        <input type="text" placeholder="输入名字" v-model="keyWord">
        <button @click="sortType = 1">年龄升序</button>
        <button @click="sortType = 2">年龄降序</button>
        <button @click="sortType = 0">原顺序</button>
        <li v-for="(p, index) of filPersons" :key="p.id">
            {{p.name}}--{{p.age}}
        </li>
    </div>
    <script>
        new Vue({
            el: '#root',
            data: {
                keyWord: "",
                sortType: 0, //0原顺序，1升序，2降序
                persons: [
                    { id: 01, name: "马冬梅", age: 5 },
                    { id: 02, name: "周冬雨", age: 1 },
                    { id: 03, name: "周杰伦", age: 20 },
                    { id: 04, name: "温兆伦", age: 200 }
                ],
            },
            //计算属性实现过滤
            computed: {
                filPersons() {
                    const arr = this.persons.filter((p) => {
                        return p.name.indexOf(this.keyWord) !== -1
                    })

                    if (this.sortType) {
                        arr.sort((p1, p2) => {
                            return this.sortType === 1 ? p1.age-p2.age : p2.age-p1.age //三元表达式
                        })
                    }

                    return arr
                }
            },
        })
    </script>
</body>
```