"use strict";
constService = require("egg").Service;
class ShareService extends Service {
  asyncisExist(sharedurl, options = {}) {
    lets = awaitthis.app.model.Share.findOne({
      where: { sharedurl, iscancel: 0 },
      ...options,
    });
    if (!s) {
      returnthis.ctx.throw(404, "该分享已失效");
    }
    returns;
  }
}
module.exports = ShareService;
