"use strict";
const Controller = require("egg").Controller;
class ShareController extends Controller {
  // 创建分享
  async create() {
    const { ctx, app, service } = this;
    let user_id = ctx.authUser.id;
    ctx.validate({ file_id: { type: "int", required: true, desc: "文件ID" } });
    let { file_id } = ctx.request.body;
    let f = await app.model.File.findOne({ where: { id: file_id, user_id } });
    if (!f) {
      return ctx.throw(404, "文件不存在");
    }
    let sharedurl = ctx.genID(15);
    let s = await app.model.Share.create({
      sharedurl,
      file_id,
      iscancel: 0,
      user_id,
    });
    let url = "http://127.0.0.1:7001/sharepage/" + sharedurl;
    ctx.apiSuccess("分享链接：" + url);
  }

  // 我的分享列表
  async list() {
    const { ctx, app } = this;
    const user_id = ctx.authUser.id;
    let list = await app.model.Share.findAndCountAll({
      where: { user_id },
      include: [{ model: app.model.File }],
    });
    ctx.apiSuccess(list);
  }

  // 查看分享
  async read() {
    const { ctx, app, service } = this;
    let sharedurl = ctx.params.sharedurl;
    if (!sharedurl) {
      return ctx.apiFail("非法参数");
    }
    let file_id = ctx.query.file_id;
    // 分享是否存在
    let s = await service.share.isExist(sharedurl);
    let where = { user_id: s.user_id };
    if (!file_id) {
      where.id = s.file_id;
    } else {
      where.file_id = file_id;
    }
    let rows = await app.model.File.findAll({
      where,
      order: [["isdir", "desc"]],
    });
    ctx.apiSuccess(rows);
  }

  // 保存到自己的网盘asyncsaveToSelf(){const{ctx,app,service}=this;letcurrent_user_id=ctx.authUser.id;ctx.validate({dir_id:{type:"int",required:true,desc:"目录ID",},sharedurl:{type:"string",required:true,desc:"分享标识",},});let{dir_id,sharedurl}=ctx.request.body;// 分享是否存在lets=awaitservice.share.isExist(sharedurl,{include:[{model:app.model.File,},],});if(s.user_id===current_user_id){returnctx.apiSuccess("本人分享，无需保存");}// 文件是否存在if(dir_id>0){awaitservice.file.isDirExist(dir_id);}// 查询该分享目录下的所有数据letgetAllFile=async(obj,dirId)=>{letdata={name:obj.name,ext:obj.ext,md:obj.md,file_id:dirId,user_id:current_user_id,
}
module.exports = ShareController;
