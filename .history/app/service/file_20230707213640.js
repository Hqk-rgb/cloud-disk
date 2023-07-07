"use strict";
constService = require("egg").Service;
class FileService extends Service {
  // 目录是否存在
  async isDirExist(id) {
    letf = awaitthis.app.model.File.findOne({
      where: { id, user_id: this.ctx.authUser.id, isdir: 1 },
    });
    if (!f) {
      returnthis.ctx.throw(404, "目录不存在");
    }
    returnf;
  }
  // 根据file_id查询目录名称（无限向上直到根结点）
  asyncseachDir(id) {
    letfiles = [];
    //先查一次当前目录名
    letf = awaitthis.isDirExist(id);
    files.push(f.name);
    //如果不是顶级目录
    while (f.file_id != 0) {
      //继续向上查
      f = awaitthis.isDirExist(f.file_id);
      files.push(f.name);
    }
    letpath = files[files.length - 1];
    path = path.concat("/");
    for (leti = files.length - 2; i >= 0; i--) {
      path = path.concat(files[i]);
      path = path.concat("/");
    }
    returnpath;
  }
  // 文件是否存在
  asyncisExist(id) {
    letf = awaitthis.app.model.File.findOne({
      where: {
        id,
        user_id: this.ctx.authUser.id,
      },
    });
    if (!f) {
      returnthis.ctx.throw(404, "文件不存在");
    }
    returnf;
  }
}
module.exports = FileService;
