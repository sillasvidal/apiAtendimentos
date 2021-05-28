"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterColumnEmailToLoginAtUsers1622056173075 {
  async up(queryRunner) {
    await queryRunner.dropColumn('users', 'email');
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'login',
      type: 'varchar'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('users', 'login');
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'email',
      type: 'varchar'
    }));
  }

}

exports.default = AlterColumnEmailToLoginAtUsers1622056173075;