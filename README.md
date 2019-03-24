# 环境依赖

* nodejs v8.12.0
* npm v6.4.1（nodejs自带不需要下载）

# 使用方法

```shell
git clone git@github.com:douyanlin/graduation-project-fe.git
cd graduation-project-fe
npm install
npm run start
//修改页面，浏览器自动刷新
```

**目前登录页username和password只要保证不为空就可以进入**

# 目录结构

```
├── src 页面所在目录
│   ├── common  // 公共文件夹（不需要管）
│   ├── component //公共组件文件夹（不需要管）
│   ├── pages //页面文件夹（每个人有对应名字，只需要管自己对应的）
│   ├── index.js //入口文件，不需要管
│   ├── router.js //路由文件，不需要管
├── static // 静态资源文件，不需要管
├── .babelrc //不需要管
├── .babelrc //不需要管
├── package.json //不需要管
├── webpack.config.js //不需要管
```

**在src/pages中找到对应自己名字的目录进行开发，不要乱动**

# 技术栈

* react
* sass/css （自学css即可）