"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddProfessionIdToSpecialists1621989288068 {
  async up(queryRunner) {
    await queryRunner.addColumn('specialists', new _typeorm.TableColumn({
      name: 'profession_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('specialists', new _typeorm.TableForeignKey({
      name: 'SpecialistProfession',
      columnNames: ['profession_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'professions',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('specialists', 'SpecialistProfession');
    await queryRunner.dropColumn('specialists', 'profession_id');
  }

}

exports.default = AddProfessionIdToSpecialists1621989288068;