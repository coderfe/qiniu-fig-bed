const path = require('path');
const vscode = require('vscode');
const qiniu = require('qiniu');
const clipboardy = require('clipboardy');

function activate(context) {

  let disposable = vscode.commands.registerCommand('extension.qiniu', function () {

    // 获取用户自定义配置
    const config = vscode.workspace.getConfiguration('qiniu');
    const enable = config.enable;
    if (!enable) {
      vscode.window.showWarningMessage('请修改配置文件以启用插件：file > perferences > User Settings');
    }
    const AK = config.AccessKey;
    const SK = config.SecretKey;
    const bucketName = config.bucket;
    const domin = config.domin;

    // 从系统剪切板中获取文件
    const extNameReg = /(png|jpg|jpeg|gif|webp|bmp|svg)/ig;
    const localFilePath = clipboardy.read();
    const localFilePathExt = path.extname(localFilePath);
    const isPicture = extNameReg.test(localFilePathExt);

    if (isPicture) {
      // 上传图片
      
      vscode.window.showInputBox({
        placeHolder: "请输入上传到七牛云空间后的文件名，可以包含前缀，例如：blog/file"
      }).then((res) => {
        // 如果 res 未填，则使用默认设置
        res = res ? res : new Date().getTime();

        // 配置 AccessKey / SecretKey
        qiniu.conf.ACCESS_KEY = AK;
        qiniu.conf.SECRET_KEY = SK;

        // 要上传的空间
        let bucket = bucketName;

        //上传到七牛后保存的文件名
        let key = `${res}${localFilePathExt}`;

        //构建上传策略函数
        function uptoken(bucket, key) {
          var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
          return putPolicy.token();
        }

        // 生成上传 Token
        let token = uptoken(bucket, key);

        // 要上传文件的本地路径
        let filePath = localFilePath;

        // 构造上传函数
        function uploadFile(uptoken, key, localFile) {
          var extra = new qiniu.io.PutExtra();
          qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
            if (!err) {
              // 上传成功， 处理返回值
              const image = `![${key}](${domin}/${ret.key})`;
              let editor = vscode.window.activeTextEditor;

              editor.edit((textEditorEdit) => {
                textEditorEdit.insert(editor.selection.active, image);
              });
              vscode.window.showInformationMessage("上传成功！");

            } else {
              // 上传失败， 处理返回代码
              vscode.window.showWarningMessage(err.error);
            }
          });
        }

        // 调用uploadFile上传
        uploadFile(token, key, filePath);
      });
    } else {
      return;
    }

  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;
