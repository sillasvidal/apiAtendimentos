"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateClientsTable1621895640072 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'clients',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'cpf',
        type: 'varchar'
      }, {
        name: 'phone',
        type: 'varchar'
      }, {
        name: 'cellphone',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'blood-type',
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
    await queryRunner.dropTable('clients');
  }

}

exports.default = CreateClientsTable1621895640072;