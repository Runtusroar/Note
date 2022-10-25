### MySql

#### 一、MySql卸载与安装

由于MySQL的安装过程中，若存在MySQL安装包或卸载残留会出现安装失败的情况,因此在安装前需进行检查

##### 1、Linux环境下

##### 查看是否安装过MySQL

```js
//1、检查是否有MySQL的rpm包(如果存在MySQL的rpm包则说明安装过MySQL)
rpm -qa | grep -i mysql # -i 忽略大小写

//2、查看MySQL的启动状态(若MySQL是启动状态，则需先关闭MySQL，然后再进行卸载)
systemctl status mysqld.service
```

##### 卸载

```js
//1、关闭MySQL服务
systemctl stop mysqld.service

//2、卸载rpm -qa | grep -i mysql命令查处的程序
yum remove mysql-xxx mysql-xxx mysql-xxx mysqk-xxxx

//3、反复执行 rpm -qa | grep -i mysql 确认是否有卸载残留

//4、删除 mysql 相关文件
	//查找相关文件
    find / -name mysql
    //删除查找出来的文件
    rm -rf xxx

//5、删除my.cnf
rm -rf /etc/my.cnf
```

##### 安装

```js
//1、在MySQL官网下载推荐的MySQL APT/Yum Repository
官网：https://www.mysql.com

//2、通过xtpf将下载好的文件上传到Linux的/opt目录下

//3、执行以下代码进行安装(必须按顺序执行)
apt-get/yum install 文件地址

//4、检查是否安装成功

	//查看版本
	mysql --version  #或  mysqladmin --version
    //查看包
	rpm -qa|grep -i mysql
```

##### 初始化MySQL

```js
//1、初始化MySQL
    //以root身份运行MySQL
    mysqld --initialize --user=mysql
	//查看MySQL密码
    cat /var/log/mysqld.log

//2、启动MySQL，查看状态
//Debian：
	service mysql status
    
//CentOS
#加不加.service后缀都可以 
启动：systemctl start mysqld.service 
关闭：systemctl stop mysqld.service 
重启：systemctl restart mysqld.service 
查看状态：systemctl status mysqld.service

//3、查看MySQL是否自启动
systemctl list-unit-files|grep mysqld.service
	
	//设置为自启动
    systemctl enable mysqld.service 
	//关闭自启动
	systemctl disable mysqld.service

```

##### 登录MySQL

```js
//1、mysql登录
mysql –u用户名 –p

//2、修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```



##### 查看与创建数据库

```js
//1、查看数据库
show databases;

//2、创建数据库
create database 数据库名
```



##### 执行sql脚本

```js
//1、选定数据库(数据库名与脚本名一致)
use 数据库名

//2、执行脚本
source sql文件全路径地址
```

### 二、Linux解压缩

```js
//1、下载并安装rar
	//下载
	wget https://www.rarlab.com/rar/rarlinux-x64-5.3.0.tar.gz
	//安装
	tar -xzpvf rarlinux-x64-5.3.0.tar.gz
	cd rar
    make
    
//2、压缩文件
rar test.rar ./test/  //将test目录打包为test.rar
    
//3、解压文件
rar x 文件.rar //解压到当前目录
```

#### screen的基本使用

```js
//1、创建screen会话
screen -S 会话名称

//2、暂时离开(会话中的任务不会终止)
快捷键：Ctrl+a d (先按住Ctrl,再依次按a,d)

//3、恢复会话(离开后再回到某个会话)
screen -r 会话名称

//4、列出当前存在的会话列表
screen -ls

//5、关闭当前会话(删除当前会话)
exit
```



