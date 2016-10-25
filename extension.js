let vscode = require('vscode');
let qiniu = require('qiniu');

function activate(context) {

  let disposable = vscode.commands.registerCommand('extension.qiniu', function () {

    const config = vscode.workspace.getConfiguration('qiniu');
    const enable = config.enable;
    if (!enable) {
      vscode.window.showWarningMessage('请修改配置文件以启用插件：file > perferences > User Settings');
    }
    const AK = config.AccessKey;
    const SK = config.SecretKey;
    const bucketName = config.bucket;
    const domin = config.domin;

    vscode.window.showInputBox({
      placeHolder: "请输入本地文件路径"
    }).then((res) => {

      // 取到本地文件路径
      const reg = /"/g;
      let localFilePath = res.replace(reg, '');

      console.log(localFilePath);

      vscode.window.showInputBox({
        placeHolder: "请输入上传到七牛云空间后的文件名，可以包含前缀，例如：blog/name.png"
      }).then((res) => {

        const remotePath = res;

        qiniu.conf.ACCESS_KEY = AK;
        qiniu.conf.SECRET_KEY = SK;

        // 要上传的空间
        bucket = bucketName;

        //上传到七牛后保存的文件名
        key = `${remotePath}.png`;

        //构建上传策略函数
        function uptoken(bucket, key) {
          var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
          return putPolicy.token();
        }

        // 生成上传 Token
        token = uptoken(bucket, key);

        // 要上传文件的本地路径
        filePath = localFilePath;

        // 构造上传函数
        function uploadFile(uptoken, key, localFile) {
          var extra = new qiniu.io.PutExtra();
          qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
            if (!err) {
              // 上传成功， 处理返回值
              const image = `![${remotePath}](${domin}/${ret.key})`;
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
        return false;
      });

    }, (err) => {
      // 文件路径无效
      return false;
    });

  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;