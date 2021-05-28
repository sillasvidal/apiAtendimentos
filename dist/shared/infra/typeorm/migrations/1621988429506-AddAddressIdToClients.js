"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddAddressIdToClients1621988429506 {
  async up(queryRunner) {
    await queryRunner.addColumn('clients', new _typeorm.TableColumn({
      name: 'address_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('clients', new _typeorm.TableForeignKey({
      name: 'ClientAddress',
      columnNames: ['address_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'addresses',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('clients', 'ClientAddress');
    await queryRunner.dropColumn('clients', 'address_id');
  }

}

exports.default = AddAddressIdToClients1621988429506;