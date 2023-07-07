"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const{INTEGER,STRING,DATE,ENUM,TEXT}=Sequelize;returnqueryInterface.createTable("file",{id:{type:INTEGER(20),primaryKey:true,autoIncrement:true,},name:{type:STRING(100),allowNull:false,defaultValue:"",comment:"文件名",},ext:{type:STRING(50),allowNull:true,defaultValue:"",comment:"文件扩展名",},md:{type:STRING,allowNull:true,defaultValue:"",comment:"文件MD5",},file_id:{type:INTEGER,allowNull:false,defaultValue:0,comment:"父级id",},user_id:{type:INTEGER,allowNull:false,defaultValue:0,comment:"用户id",references:{model:"user",key:"id",},
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
