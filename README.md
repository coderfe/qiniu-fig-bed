# VSCode 七牛图床工具

[English](https://github.com/coderfe/qiniu-fig-bed#qiniu-fig-bed-tool)

一款 VSCode 插件，在 VSCode 中上传图片到七牛云空间。

## 功能展示

当你在编辑 markdown 文件需要插入外部图片时，你可是使用这款插件直接上传并生成 markdown 格式的链接直接插入到文档，省去了在网页端上传的诸多步骤。

示例如下:

![blog/qiniu-fig-bed.gif](http://oaz5uxplb.bkt.clouddn.com/blog/qiniu-fig-bed.gif)

## 配置

打开 `file > preferences > User Settings > qiniu`，更改 `User Setting` 如下：

```json
"qiniu.enable": true,
"qiniu.AccessKey": "your access_key",
"qiniu.SecretKey": "your secret_key",
"qiniu.bucket": "your bucket",
"qiniu.remotePath": "",
"qiniu.domin": "you bucket domin"
```

> 小提示: **access\_key & secret\_key** 可以在[这里](https://portal.qiniu.com/user/key)找到

## 使用

1. 复制本地文件路径（`Shift + 鼠标右键` > 复制为路径）
2. 在 VSCode 中按快捷键：**`Ctrl + Q N`** ，将路径粘贴到输入框中，回车
3. **IMPORTANT：** 然后再弹出的第二个输入框中输入文件上传之后的名称，可以包含前缀，如：`前缀/文件名.文件格式`
4. 各个步骤中没有进行验证，所以应该正确输入文件路径和文件名称，否则会返回不正确的链接

## 联系我

如果你有好的想法，联系我：<a href="mailto:coderfee@outlook.com">coderfee@outlook.com</a>


# qiniu-fig-bed-tool

An extension for VSCode, upload files to qiniu in VSCode.

## Features

When you insert one image in a `markdown` file, you can use this extension to upload images and get the links of images from qiniu cloud.

For example:

![blog/qiniu-fig-bed.gif](http://oaz5uxplb.bkt.clouddn.com/blog/qiniu-fig-bed.gif)

## Settings

Open `file > preferences > User Settings > qiniu`, and change your configuration like this:

```json
"qiniu.enable": true,
"qiniu.AccessKey": "your access_key",
"qiniu.SecretKey": "your secret_key",
"qiniu.bucket": "your bucket",
"qiniu.remotePath": "",
"qiniu.domin": "you bucket domin"
```

> Tips: **access\_key and secret\_key** can find [here](https://portal.qiniu.com/user/key)

## Usage

1. Copy local file path.
2. **`Ctrl + Q N`**, paste local file path to input box, `Enter`
3. **IMPORTANT:** Enter the remote path, like: `prefix/file-name.fileType`

## Issues

If you find some issues, please contact with me <a href="mailto:coderfee@outlook.com">coderfee@outlook.com</a>

**Enjoy!**