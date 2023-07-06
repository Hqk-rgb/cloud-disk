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
  /**
   * 设置 redis 缓存
   * @param { String } key 键
   * @param {String | Object | array} value 值
   * @param { Number } expir 过期时间单位秒
   * @return { String } 返回成功字符串OK   */
  asyncset(key, value, expir = 0) {
    const { redis } = this.app;
    if (expir === 0) {
      returnawaitredis.set(key, JSON.stringify(value));
    }
    returnawaitredis.set(key, JSON.stringify(value), "EX", expir);
  }
  /**   * 获取 redis 缓存   * @param { String } key 键   * @return { String | array | Object } 返回获取的数据   */ asyncget(
    key
  ) {
    const { redis } = this.app;
    constresult = awaitredis.get(key);
    returnJSON.parse(result);
  }
  /**   * redis 自增   * @param { String } key 键   * @param { Number } value 自增的值   * @return { Number } 返回递增值   */ asyncincr(
    key,
    number = 1
  ) {
    const { redis } = this.app;
    if (number === 1) {
      returnawaitredis.incr(key);
    }
    returnawaitredis.incrby(key, number);
  }
  /**   * 查询⻓度   * @param { String } key   * @return { Number } 返回数据⻓度   */ asyncstrlen(
    key
  ) {
    const { redis } = this.app;
    returnawaitredis.strlen(key);
  }
}
