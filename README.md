# 项目包含功能描述
![image](https://user-images.githubusercontent.com/2426973/75834578-53a74d80-5df7-11ea-8d99-8409a53a6f69.png)

先放个预览图，后面书写补全，主要功能有：

- 基础的CMS常用页面框架
- 纯粹JS进行的EXCEL获取展示
- 纯粹JS完成的营销页面配置和生成
- SSR模式支持
- 集成接口中间件，考虑用mongoDB进行一些非业务数据管理


# 项目依赖说明
## UI框架

交互实现使用了常见的VUE后台框架 ElementUI,图表使用了 AntV. 同时为了提高交互体验，禁用了双击交互。

[Element-UI官网](https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start)

## CSS处理

自定义主题采用了变量设定的方式，文件路径是 /src/asset/style，其中 element-variables.scss 是element相关变量，mainstyle.scss是自定义界面的一些变量。

## 其他依赖项

- concurrently: 同时运行前端后和后端使用，在npm run dev时生效，用了-r参数关闭冗余的控制台输出
- postcss-px2rem：自动进行 px和rem转化, 配合src下的rem.js处理自适应
- fastclick：缩短固有的 点击需要等待 300ms才进行交互的机制
- axios：前端XHR请求的支持库
- Winston :日志处理，入口文件在serve/lib/logger.js

# 项目目录结构说明

再写吧，注意静态资源在 public里面

代码中支持了别名引用

- '@' 等于 'src'
- '@router' 等于 'src/router'
- '@views' 等于 'src/views'
- '@assets' 等于 'src/assets'
- '@store' 等于 'src/store'
- '@mockdatas' 等于 'mockdatas'

## 目录树
```  
├── babel.config.js //babel配置        
├── package-lock.json    
├── package.json    
├── public  //静态文件夹，可以用 http(s)://host/子目录名 直接引用    
│   ├── favicon //网站浏览器icon    
│   ├── icon  //图标库，使用了 iconfont    
│   └── index.html    
├── scripts //启动脚本    
│   ├── serve.js    
│   └── start.js    
├── server //SSR服务脚本文件  
│   ├── app //服务端代码（中间键）  
│   │   ├── mockdatas   //测试时期 模拟数据数据   
│   ├── dev.ssr.js    
│   ├── server.js    
│   └── ssr.js    
├── src //主项目目录    
│   ├── App.vue    
│   ├── assets //项目静态资源    
│   │   ├── images      
│   │   └── style   
│   │       ├── element-variables.scss //UI框架主题变量    
│   │       └── mainstyle.scss //自己书写的通用样式    
│   ├── components //模块    
│   ├── views //页面    
│   ├── entry-client.js //SSR的客户端脚本    
│   ├── entry-server.js //SSR的服务端脚本    
│   ├── index.temp.html     
│   ├── main.js //vue项目入口文件    
│   ├── router //页面路由    
│   └── store //vuex的空间配置    
└── vue.config.js  //打包配置，包含了 webpackage的内容    
```

# 项目运行
项目是基于 Vue-cli3创建的基础目录，以SSR模式运行。

1. [通过vue-cli3构建一个SSR应用程序](https://juejin.im/post/5b98e5875188255c8320f88a)
2. [基于vue-cli3 SSR 程序实现热更新功能](https://juejin.im/post/5bc4321b6fb9a05d1e0e824b)


## 项目安装

需要安装cnpm,不然很多依赖包安装会卡

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

进行安装
```
cnpm install
```

### 启动开发环境（热更新）
```
npm run dev
```
默认端口8889，如果被占用会自动+1

### 启动正式环境
```
npm run build:win
node server.js
```

### 进行语法校准
```
npm run lint
```


