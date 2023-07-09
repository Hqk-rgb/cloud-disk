"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    username: "otter",
    user: null,
    token: null
  },
  actions: {
    login({ state }, user) {
      state.user = user;
      state.token = user.token;
      common_vendor.index.setStorageSync("user", JSON.stringify(user));
      common_vendor.index.setStorageSync("token", user.token);
    }
  }
});
exports.store = store;
