# qiniu fig bed tool

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
3. Enter the remote path, like: `prefix/file-name.fileType`

## Issues

If you find some issues, please contact with me <a href="mailto:coderfee@outlook.com">coderfee@outlook.com</a>

## Release Notes

### 0.0.1

It can work, it can upload file to qiniu

**Enjoy!**