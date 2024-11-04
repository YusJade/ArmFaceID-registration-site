# ArmFaceID-registration-site

## 如何运行本工程

> 开发环境配置： [如何安装 Vue 3 并配置开发环境](https://developer.aliyun.com/article/1397543)

配置好开发环境后，在工程顶层目录下：

```
npm install # 安装项目的依赖
cp -r face-grpc node_modules # 每次npm install后需要将自己的库放入
npm run dev # 运行开发服务器
```

然后能看到项目预览地址，在浏览器中输入地址即可。

## 开发目标

- 实现表单提交功能，内容包括昵称、邮箱，使用正则表达式校验格式是否符合要求。

> [📖Element Plus | Form 表单](https://element-plus.org/zh-CN/component/form.html)

- 实现图片上传功能，将图片文件转换为字节数组`Uint8Array`。

- 当用户点击注册按钮时，上传表单和图片到后端，后端返回注册状态，将注册状态（成功或者失败原因）以弹窗`Message`等形式反馈给用户。

```js
 Message(`${resp?.getRes.name}，欢迎你`)
 ```
