### 1 Git简介

#### 1.1 什么是git

Git是一个分布式的代码管理工具

#### 1.2 基本概念

- **工作区：** (Workspace)就是你在电脑里能看到的目录
- **暂存区：**  (stage) 或 (index)。一般存放在 **.git** 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）
- **版本库：**工作区有一个隐藏目录 **.git**，这个不算工作区，而是 Git 的版本库
- **远程库：** 代码托管的服务器，例如gitee, github

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\gitProcess.jpg)

### 2 安装与卸载Git环境

#### 2.1 卸载git

1 删除电脑上的git环境变量

2 卸载git软件

#### 2.2 安装git

通过Git官方下载地址: https://git-scm.com/download 按照操作系统下载相应软件

> 无脑下一步即可，安装过后会有三个程序

**Git Bash ：**Unix与Linux风格命令行，使用最多，最推荐

**Git CMD ：**Windows风格的命令行

**Git GUI：**图形界面的git，不建议初学者使用



### 3 配置环境

#### 3.1 项目签名

仅在当前仓库有效

1 设置签名

```git
git config [--local] user.name "Your Name"  
git config [--local] user.email "email@example.com"
```

2 配置地址

```git
.git/config
```

3 查看配置

```git
git config --list || git config -l
```



#### 3.2 用户签名

仅系统当前用户有效

1 设置签名

```git
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

2 配置地址

```git
~/用户/用户名/.gitconfig
```

3 查看配置

```git
git config --global --list
```



#### 3.3 系统签名

该系统下所有用户均有效 

1 设置签名

```git
git config --system user.name "Your Name"
git config --system user.email "email@example.com"
```

2 配置地址

```git
Git/etc/gitconfig
```

3 查看配置

```git
git config --system --list
```



#### 3.4 用户优先级

设置多个用户时，其优先级关系

```git
--local > --global > --system
```

### 4 基本使用

#### 4.1 git init

在工作区初始化一个git仓库

```git 
git init
```

> 该方法将在工作区创建一个.git隐藏文件夹

#### 4.2 git add

将工作区的文件添加到暂存区

```git
1 指定文件(可以是多个，中间用空格分开)
	git add fileName
2 全部文件
	git add .
```

#### 4.3 git commit

将暂存区的文件提交到本地库

```git
1 指定文件(可以是多个，中间用空格分开)
	git commit -m "commit message" fileName
2 全部文件
	git commit -m "commit message"
3 自定义
	git commit
```

> 文件的添加并提交(add & commit)可以简写：git commit am



### 5 分支

#### 5.1 分支的概念

1 什么是分支？

> 在了解分支是什么之前，我们先了解什么是时间线

① 在我们每次提交代码时(commit)，都会形成一个时间节点

<img src="C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branch-one.png" style="zoom: 50%;" />

② 当我们提交的次数变多时就会形成一条由时间节点组成的时间线

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branch-two.png)

③ **每个分支都代表一条时间线，分支的本质就是一个指针**，默认指向最新节点(例如最初的master分支)

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branch-three.png)

> 注意：head指针表示我们目前处于哪个分支上

④ 项目初始化时并提交后默认只有一个分支，当我们创建一个新分支时，便创建了一个新分支指针

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branck-four.png)

⑤ 若我们切换到新指针，且新提交一次

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branck-five.png)

⑥ 若我们切换到master分支，并合并dev分支

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branck-six.png)

⑦ 若我们切换到dev分支进行一次提交，之后再切换回master分支进行一次提交，此时时间线便会分叉，犹如平行宇宙的诞生

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branch-seven.png)

⑧ 若master分支与dev分支都修改了同一个文件并提交，此时便会出现冲突，解决冲突合并后



![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branch-eight.png)

2 分支的作用？

> 各个分支可以开发不同的功能，相互独立，并且可以合并，将所有功能集中到一个分支上

![](C:\Users\11292\Desktop\AllThing\前端学习笔记\git操作\img\branch.png)

#### 5.2 基本语法

1 查看分支

```git
git branch -v
```

2 创建分支

```git
git branch 分支名
```

3 切换分支

- 老版本

```git
git checkout 目标分支名

//创建并切换分支
git checkout -b 分支名
```

- 新版本  (新版本跟合理)

```git
git switch 目标分支名

//创建并切换分支名
git switch -c 分支名
```

4 合并分支(将指定分支合并到当前分支)

```git
git merge 目标分支名
```

5 删除分支

```git
git branch -d 分支名
```

### 6 远程仓库

注意：推送代码前需要先给远程仓库地址取个别名

```git
git remote add 地址别名(通常为origin) 仓库地址
```

注意：第一次推送代码时，

#### 6.1 github

