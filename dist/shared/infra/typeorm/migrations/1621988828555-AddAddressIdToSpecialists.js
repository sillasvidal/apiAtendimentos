"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddAddressIdToSpecialists1621988828555 {
  async up(queryRunner) {
    await queryRunner.addColumn('specialists', new _typeorm.TableColumn({
      name: 'address_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('specialists', new _typeorm.TableForeignKey({
      name: 'SpecialistAddress',
      columnNames: ['address_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'addresses',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('specialists', 'SpecialistAddress');
    await queryRunner.dropColumn('specialists', 'address_id');
  }

}

exports.default = AddAddressIdToSpecialists1621988828555;