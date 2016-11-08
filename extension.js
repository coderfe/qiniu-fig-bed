const path = require('path');
const vscode = require('vscode');
const qiniu = require('qiniu');

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

    // 输入本地文件路径，复制粘贴
    vscode.window.showInputBox({
      placeHolder: "请输入本地文件路径"
    }).then((res) => {

      // 取到本地文件路径
      const reg = /"/g;
      let localFilePath = res.replace(reg, '');
      // 获取文件类型
      let extname = path.extname(localFilePath);

      // console.log(localFilePath);

      // 上传至七牛空间后的文件名
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
        let key = `${res}${extname}`;

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

      }, (err) => {
        // 上传至七牛空间后的文件名无效
        console.log(err);
        return false;
      });

    }, (err) => {
      // 文件路径无效
      console.log(err);
      return false;
    });

  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;