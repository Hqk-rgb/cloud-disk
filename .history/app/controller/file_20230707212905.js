"use strict";
constController=require("egg").Controller;constfs=require("fs");constpath=require("path");
class FileController extends Controller{
    // 上传
    asyncupload(){const{ctx,app,service}=this;constcurrentUser=ctx.authUser;console.log(ctx.request.files);if(!ctx.request.files){returnctx.apiFail("请先选择上传文件");}ctx.validate({file_id:{required:true,type:"int",defValue:0,desc:"目录id",},});constfile_id=ctx.query.file_id;console.log(file_id+"<<<<<<<<<<");
    // 目录id是否存在
    if(file_id>0){
        // 目录是否存在
        await service.file.isDirExist(file_id);}
    //取得上传的文件
    constfile=ctx.request.files[0];
    // 根据file_id一直向上找到顶层目录
    constprefixPath=awaitservice.file.seachDir(file_id);console.log(prefixPath);
    // 拼接出最终文件上传目录
    constname=prefixPath+ctx.genID(10)+path.extname(file.filename);
    // 判断用户网盘内存是否不足
    lets=awaitnewPromise((resolve,reject)=>{
    fs.stat(file.filepath,(err,stats)=>{resolve((stats.size/1024).toFixed(1));});}
};
if(currentUser.total_size-currentUser.used_size<s){returnctx.apiFail("你的可用内存不足");}
// 上传到oss
letresult;try{result=awaitctx.oss.put(name,file.filepath);}catch(err){console.log(err);}console.log(result.url);
// 写入到数据表
if(result){letaddData={name:file.filename,ext:file.mimeType,md:result.name,file_id,user_id:currentUser.id,size:parseInt(s),isdir:0,url:result.url,};letres=awaitapp.model.File.create(addData);
// 更新用户的网盘内存使用情况
currentUser.used_size=currentUser.used_size+parseInt(s);currentUser.save();returnctx.apiSuccess(res);}ctx.apiFail("上传失败");}}
module.exports=FileController;