"use strict";
constController = require("egg").Controller;
class ShareController extends Controller {
  // 创建分享
  asynccreate() {
    const { ctx, app, service } = this;
    letuser_id = ctx.authUser.id;
    ctx.validate({ file_id: { type: "int", required: true, desc: "文件ID" } });
    let { file_id } = ctx.request.body;
    letf = awaitapp.model.File.findOne({ where: { id: file_id, user_id } });
    if (!f) {
      returnctx.throw(404, "文件不存在");
    }
    letsharedurl = ctx.genID(15);
    lets = awaitapp.model.Share.create({
      sharedurl,
      file_id,
      iscancel: 0,
      user_id,
    });
    leturl = "http://127.0.0.1:7001/sharepage/" + sharedurl;
    ctx.apiSuccess("分享链接：" + url);
  }
}
module.export = ShareController;
