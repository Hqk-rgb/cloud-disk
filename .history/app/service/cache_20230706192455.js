"use strict";
const Service = require("egg").Service;

class CacheService extends Service {
  async getList(key, isChildObject = false) {
    const { redis } = this.app;
    let data = await redis.lrange(key, 0, -1);
    if (isChildObject) {
      data = data.map((item) => {
        return JSON.parse(item);
      });
    }
    return data;
  }
}
