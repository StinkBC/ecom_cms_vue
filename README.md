# 项目依赖说明
## UI框架

交互实现使用了滴滴旗下的 Cube-ui,这个框架主要实现了交互，UI的CSS部分自己书写。

[Cube-ui官网](https://didi.github.io/cube-ui/#/zh-CN/docs/quick-start)

## CSS语言

Cube-ui框架使用的是 stylus，自己写的部分用的是 sass。

## 其他依赖项

- postcss-px2rem：自动进行 px和rem转化
- fastclick：缩短固有的 点击需要等待 300ms才进行交互的机制
-  axios：前端XHR请求的支持库

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
├── README.md    
├── babel.config.js //babel配置，似乎没啥需要配置的    
├── mockdatas   //测试时期假数据       
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
│   ├── dev.ssr.js    
│   ├── server.js    
│   └── ssr.js    
├── src //主项目目录    
│   ├── App.vue    
│   ├── assets //项目静态资源    
│   │   ├── images      
│   │   └── style    
│   │       └── mainstyle.scss //自己书写的通用样式    
│   ├── components //模块    
│   ├── views //页面    
│   ├── entry-client.js //SSR的客户端脚本    
│   ├── entry-server.js //SSR的服务端脚本    
│   ├── index.temp.html     
│   ├── main.js //vue项目入口文件    
│   ├── router //页面路由    
│   ├── store //vuex的空间配置    
│   ├── theme.styl //cube-ui主题文件，理论上不需要改    
│   └── cube-ui.js //cube-ui主文件，理论上不需要改    
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

### 启动正式环境
```
npm run build:win
node server.js
```

### 进行语法校准
```
npm run lint
```


