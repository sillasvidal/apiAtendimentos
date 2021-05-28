"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAddressesTable1621987921285 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'addresses',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'cep',
        type: 'varchar'
      }, {
        name: 'street',
        type: 'varchar'
      }, {
        name: 'number',
        type: 'int'
      }, {
        name: 'neighborhood',
        type: 'varchar'
      }, {
        name: 'city',
        type: 'varchar'
      }, {
        name: 'state',
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
    await queryRunner.dropTable('addresses');
  }

}

exports.default = CreateAddressesTable1621987921285;