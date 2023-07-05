/* eslint-disable */
"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: "egg-cors",
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
