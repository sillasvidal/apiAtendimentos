"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecialistsTable1621898769280 = void 0;

var _typeorm = require("typeorm");

class CreateSpecialistsTable1621898769280 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'specialists',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'register',
        type: 'varchar'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'phone',
        type: 'integer'
      }, {
        name: 'cellphone',
        type: 'integer'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('specialists');
  }

}

exports.CreateSpecialistsTable1621898769280 = CreateSpecialistsTable1621898769280;