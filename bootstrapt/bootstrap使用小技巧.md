### bootstrap使用小技巧



#### 1 响应式导航栏

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Bootstrap 实例 - 响应式的导航栏</title>
	<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<nav class="navbar navbar-inverse" >
	<div class="container-fluid"> 
		
		<!-- 导航栏小界面内容 -->
		<div class="navbar-header">

			<!-- 响应式右侧按钮 -->
			<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target="#example-navbar-collapse">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>

			<!-- 响应式左侧内容 -->
			<a class="navbar-brand" href="#">菜鸟教程</a>
		</div>

		<!-- 这里面写入要折叠的内容 -->
		<div class="collapse navbar-collapse" id="example-navbar-collapse">
			<ul class="nav navbar-nav">
				<li><a href="#">iOS</a></li>
				<li><a href="#">SVN</a></li>
				<li><a href="#">Java</a></li>
				<li><a href="#">Java</a></li>
			</ul>
		</div>
		
		
	</div>
</nav>

</body>
</html>
```

