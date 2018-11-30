const vscode = require('vscode')
const path = require('path')
const qiniu = require('qiniu')
const moment = require('moment')

function activate (context) {
  let disposable = vscode.commands.registerCommand('extension.qiniu', () => {
    // 获取用户的配置信息
    const userConfig = vscode.workspace.getConfiguration('qiniu')
    const isEnable = userConfig.enable

    // 如未启用，提示用户启用
    if (!isEnable) {
      vscode.window.showInformationMessage('请在设置中启用插件，qiniu.enable: true')
      return
    }
    // 上传配置
    const accessKey = userConfig.AccessKey
    const secretKey = userConfig.SecretKey
    const bucketName = userConfig.bucket
    const domain = userConfig.domain
    const protocol = userConfig.protocol

    vscode.window.showInputBox({
      placeHolder: '请输入本地文件路径'
    }).then((val) => {
      if (val) {
        // 验证本地文件路径
        const reg = /"/g
        let localFilePath = val.replace(reg, '')
        // 文件类型
        let fileExt = path.extname(localFilePath)

        // 设置上传后的文件名
        vscode.window.showInputBox({
          placeHolder: '输入上传后的文件名，可包含前缀，可省略文件后缀。如：blog/shot'
        }).then((val) => {
          let remoteName
          if (val) {
            remoteName = val
          } else if (val === undefined) {
            return
          } else {
            let now = moment()
            remoteName = moment(now).format('YYYY-MM-DD-HH-mm-ss')
          }

          // 上传配置
          qiniu.conf.ACCESS_KEY = accessKey
          qiniu.conf.SECRET_KEY = secretKey
          let bucket = bucketName
          let key = `${remoteName}${fileExt}`

          function uptoken (bucket, key) {
            var putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key)
            return putPolicy.token()
          }

          let token = uptoken(bucket, key)

          // 构造上传函数
          function uploadFile (uptoken, key, localFile) {
            var extra = new qiniu.io.PutExtra()
            qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
              if (!err) {
                // 上传成功， 处理返回值
                const url = protocol ?
                  `${protocol}${domain}/${ret.key}` :
                  `${domain}/${ret.key}`;
                const mdImageUrl = `![${key}](${url})`
                let editor = vscode.window.activeTextEditor

                editor.edit((textEditorEdit) => {
                  textEditorEdit.insert(editor.selection.active, mdImageUrl)
                })
                vscode.window.showInformationMessage('上传成功！')
              } else {
                // 上传失败， 处理返回代码
                vscode.window.showWarningMessage(err.error)
              }
            })
          }
          uploadFile(token, key, localFilePath)
        })
      } else {
        return
      }
    })
  })

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate () {
}

exports.deactivate = deactivate

