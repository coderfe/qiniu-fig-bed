# VSCode 七牛图床工具

![qiniu-fig-bed](https://vsmarketplacebadge.apphb.com/version/coderfee.qiniu-fig-bed.svg)  ![qiniu-fig-bed](https://vsmarketplacebadge.apphb.com/installs/coderfee.qiniu-fig-bed.svg)

一款 VSCode 插件，在 VSCode 中上传图片到七牛云空间。

## 功能展示

当你在编辑 markdown 文件需要插入外部图片时，你可是使用这款插件直接上传并生成 markdown 格式的链接直接插入到文档，省去了在网页端上传的诸多步骤。（前提是需要复制本地文件路径），快捷键为：'crtl+q n'

示例如下:

![blog/qiniu-fig-bed.gif](https://oaz5uxplb.bkt.clouddn.com/blog/qiniu-fig-bed.gif)

> 小提示：第二个输入框的内容可选，如果不填则会将文件名称格式化为当前日期。

1. 复制本地文件路径（可以按住 **shift + 鼠标右键**快速复制）
2. 打开 Markdown 文件，快捷键为：**`Ctrl + Q N`**
3. **IMPORTANT：** 然后在弹出的第二个输入框中输入文件上传之后的名称，可以包含前缀（用于分类文件），可以省略文件后缀，如：`blog/my-image`

## 配置

打开 `file > preferences > User Settings > qiniu`，更改 `User Setting` 如下：

```json
"qiniu.enable": true,
"qiniu.AccessKey": "your access_key",
"qiniu.SecretKey": "your secret_key",
"qiniu.bucket": "your bucket",
"qiniu.remotePath": "",
"qiniu.domain": "you bucket domain"
```

> 小提示: **access\_key & secret\_key** 可以在[这里](https://portal.qiniu.com/user/key)找到

## 联系我

如果你有好的想法，联系我：<a href="mailto:coderfee@outlook.com">coderfee@outlook.com</a>

## License

MIT

**Enjoy!**
