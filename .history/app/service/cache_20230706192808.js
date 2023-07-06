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
  /**
   * 设置列表
   * @param {string} key 键
   * @param {object|string} value 值
   * @param {string} type 类型：push和unshift
   * @param {Number} expir 过期时间单位秒
   * @return { Number } 返回索引   */
  async setList(key, value, type = "push", expir = 0) {
    const { redis } = this.app;
    if (expir > 0) {
      await redis.expire(key, expir);
    }
    if (typeofvalue === "object") {
      value = JSON.stringify(value);
    }
    if (type === "push") {
      returnawaitredis.rpush(key, value);
    }
    returnawaitredis.lpush(key, value);
  }
}
