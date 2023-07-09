'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const{INTEGER,STRING,DATE,ENUM,TEXT}=Sequelize;returnqueryInterface.createTable("share",{id:{type:INTEGER(20),primaryKey:true,autoIncrement:true,},sharedurl:{type:STRING,allowNull:true,defaultValue:"",comment:"分享链接",},file_id:{type:INTEGER,allowNull:false,defaultValue:0,comment:"文件id",references:{model:"file",key:"id",},onDelete:"cascade",onUpdate:"restrict",// 更新时操作
  },iscancel:{type:INTEGER(1),allowNull:false,defaultValue:0,comment:"是否取消分享",},user_id:{type:INTEGER,allowNull:false,defaultValue:0,comment:"用户id",references:{model:"user",key:"id",},
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
