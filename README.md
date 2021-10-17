
<h1 align="center">MOMO UI</h1>

<div align="center">
类Material-UI的微信小程序组件库
</div>

## 体验

### 使用命令行
```bash
$ git clone https://github.com/Moonlightwsn/momoui.git
$ cd momoui
$ npm install
$ npm run dev 或者 npm run watch  #热更新模式
$ 生成的 miniprogram_dev 目录是一个小程序项目目录，以此目录作为小程序项目目录在开发者工具中打开即可查看自定义组件被使用的效果
```

### 使用微信扫一扫
<img src="https://cdn.jsdelivr.net/npm/momoui-miniprogram@1.0.8/momoui.png" height="256px" width="256px" alt="logo-miniprogram" />


## 开始使用

### NPM

- 在个人小程序项目下安装momoui-miniprogram

```bash
$ npm install momoui-miniprogram --production
```

- 安装完成后, 在微信开发者工具中构建npm
- 构建完成后MOMOUI所在的默认目录为 `/miniprogram_npm/momoui-miniprogram`, 如果自行调整了momoui的目录，请将下方所有引用到`/miniprogram_npm/momoui-miniprogram`目录的代码调整为新的目录
- 在app.wxss中全局引入momoui样式与字体

```css
@import '/miniprogram_npm/momoui-miniprogram/styles/static/fonts/roboto.wxss';
@import '/miniprogram_npm/momoui-miniprogram/styles/common.wxss';
```

- 在app.js中设置momoui的所在目录 
```javascript
// app.js
App({
  /**
   * 其他代码
  */
  momouiRootPath: '/miniprogram_npm/momoui-miniprogram', //(默认目录的情况下可省略)
})
```

## Typescript项目
- 使用微信开发者工具新建typesciprt项目时，目录结构有所不同，需要在 `project.config.json` 文件中另行配置
```json
"setting": {
  "packNpmManually": true,
  "packNpmRelationList": [{
      "packageJsonPath": "./package.json",
      "miniprogramNpmDistDir": "./miniprogram"
  }]
}

```
- 如果自定义整个项目的目录结构，或者对原项目的目录做过调整，在`构建npm`步骤出现问题时，请熟读官方文档 [`npm支持`](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

## 注意事项

- 建议在app.json配置中配置 `"style": "v2"`

## 示例

```js
// index.json
{
  "usingComponents": {
    "mui-button": "/miniprogram_npm/momoui-miniprogram/components/button/button"
  }
}
```

```html
<!-- index.wxml -->
<mui-button color="primary">PRIMARY</mui-button>
```

### 更多示例可参看 `/tools/demo`





