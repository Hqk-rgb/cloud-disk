/* eslint-disable */
"use strict";

const { Controller } = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "全栈开发工程师";
  }

  async list() {
    this.ctx.body = {
      msg: "ok",
      data: [
        {
          name: "微服务技术",
          price: 100,
        },
        {
          name: "容器化技术",
          price: 88,
        },
        {
          name: "Flutter 开发",
          price: 77,
        },
      ],
    };
  }
}

module.exports = HomeController;
