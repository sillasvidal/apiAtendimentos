"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddBloodTypeToClient1621990920075 {
  async up(queryRunner) {
    await queryRunner.addColumn('clients', new _typeorm.TableColumn({
      name: 'blood_type',
      type: 'varchar'
    }));
    await queryRunner.dropColumn('clients', 'blood-type');
  }

  async down(queryRunner) {
    await queryRunner.addColumn('clients', new _typeorm.TableColumn({
      name: 'blood-type',
      type: 'varchar'
    }));
    await queryRunner.dropColumn('clients', 'blood_type');
  }

}

exports.default = AddBloodTypeToClient1621990920075;